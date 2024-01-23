import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TextQuestionPopupComponent } from "../../../components/text-question-popup/text-question-popup/text-question-popup.component";
import { filter, first, switchMap, withLatestFrom } from "rxjs/operators";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { RosterService } from "../../../core/database/services/roster.service";
import { Roster } from "../../../model/roster";
import { arrayRemove } from "@angular/fire/firestore";
import { AuthService } from "../../../core/database/services/auth.service";
import { CompletionService } from "../../../core/database/services/completion.service";
import { EnergyService } from "../../../core/database/services/energy.service";
import { combineLatest, of } from "rxjs";
import { LostarkClass } from "../../../model/character/lostark-class";
import { Character } from "../../../model/character/character";
import { Dialog } from "@angular/cdk/dialog";
import { Toast } from "../../../components/toast/toast/toast.service";
import { ConfirmPopupComponent } from "../../../components/confirm-popup/confirm-popup/confirm-popup.component";

@Component({
  selector: "lostark-helper-roster",
  templateUrl: "./roster.component.html",
})
export class RosterComponent {

  public LostarkClass = LostarkClass;

  public classes = Object.keys(LostarkClass)
    .filter(key => !isNaN(+key) && !LostarkClass[key].startsWith("UNRELEASED"))
    .map(key => {
      return {
        id: key,
        name: `${LostarkClass[key][0]}${LostarkClass[key].slice(1).toLowerCase()}`,
        icon: `class_${key.padStart(2, "0")}.png`
      };
    });

  public roster$ = this.rosterService.roster$;

  public form = this.fb.group({
    name: ["", Validators.required],
    ilvl: [null, Validators.required],
    lazy: [false],
    class: [null, Validators.required]
  });

  public hasLocalstorageRoster = localStorage.getItem("roster") !== null;

  constructor(private rosterService: RosterService,
              private auth: AuthService,
              private fb: FormBuilder,
              private message: Toast,
              private completionService: CompletionService,
              private energyService: EnergyService,
              private modal: Dialog) {
  }

  public addCharacter(roster: Roster): void {
    const form = this.form.getRawValue();
    roster.characters.push({
      id: (roster.characters.map(c => c.id).sort().reverse()[0] || -1) + 1,
      name: form.name ?? "",
      ilvl: form.ilvl ?? 0,
      lazy: form.lazy ?? false,
      class: form.class ?? LostarkClass.BERSERKER,
      weeklyGold: roster.characters.length < 6,
      tickets: {
        EbonyCubeLevel1: 0,
        EbonyCubeLevel2: 0,
        EbonyCubeLevel3: 0,
        EbonyCubeLevel4: 0,
        EbonyCubeLevel5: 0,
        platinumFields: 0
      }
    });
    this.form.reset();
    this.rosterService.setOne(roster.$key, roster);
  }

  public removeCharacter(character: Character, roster: Roster): void {
    const modalRef = this.modal.open(ConfirmPopupComponent)
    modalRef.closed.subscribe(confirmed => {
      if (confirmed) {
        this.rosterService.updateOne(roster.$key, {
          characters: arrayRemove(character)
        });
      }
    });
  }

  public saveCharacterName(character: Character, roster: Roster, newName: string): void {
    combineLatest([
      this.completionService.completion$,
      this.energyService.energy$
    ]).pipe(
      first(),
      switchMap(([completion, energy]) => {
        let updated = false;
        Object.keys(completion.data).forEach(key => {
          if (key.startsWith(character.name)) {
            updated = true;
            completion.data[`${character.id}:${key.split(":")[1]}`] = completion.data[key];
            delete completion.data[key];
          }
        });
        Object.keys(energy.data).forEach(key => {
          if (key.startsWith(character.name)) {
            updated = true;
            energy.data[`${character.id}:${key.split(":")[1]}`] = energy.data[key];
            delete completion.data[key];
          }
        });
        if (updated) {
          return combineLatest([
            this.completionService.setOne(completion.$key, completion),
            this.energyService.setOne(energy.$key, energy)
          ]);
        }
        return of(null);
      })
    ).subscribe();
    this.saveCharacter({ ...character, name: newName }, roster);
  }

  public saveCharacter(character: Character, roster: Roster): void {
    this.rosterService.updateOne(roster.$key, {
      characters: roster.characters.map(char => {
        if (character.id && char.id === character.id) {
          return character;
        }
        return char;
      })
    });
  }

  exportRoster(): void {
    this.message.success("Roster copied to your clipboard");
  }

  importRoster(): void {
    const dialogRef = this.modal.open(TextQuestionPopupComponent, {
      data: {
        title: "Import roster",
        placeholder: "Paste your exported roster here"
      }
    });

    dialogRef.closed.pipe(
      filter(( json ) => {
        const parsed = JSON.parse(json as string ?? "[{}]");
        const hasCharacters = Array.isArray( parsed.characters ) && parsed.characters.length > 0;
        return ( json && hasCharacters ) as boolean;
      }),
      withLatestFrom(this.auth.uid$),
      switchMap(([rosterJson, uid]) => {
        const parsed = JSON.parse(rosterJson as string);
        return this.rosterService.updateOne(uid, { characters: parsed.characters });
      })
    ).subscribe({
        next: () => {
          this.message.success("Roster imported");
        },
        error: e => {
          this.message.error((e as Error).message || e);
        }
      })
  }

  importFromLocalStorage(uid: string): void {
    const modalRef = this.modal.open(ConfirmPopupComponent, {
      data: {
        description:"This will overwrite your current roster with previously saved local data and clear it from localstorage !"
      }
    });

    modalRef.closed.subscribe(confirmed => {
      if (confirmed) {
        const characters = JSON.parse(localStorage.getItem("roster") || "[]") as Character[];
        this.rosterService.setOne(uid, { characters, trackedTasks: {}, showAllTasks: false });
        localStorage.removeItem("roster");
        this.hasLocalstorageRoster = false;
      }
    });
  }

  trackByCharacter(index: number, character: Character): string {
    return character.name;
  }

  drop(roster: Roster, event: CdkDragDrop<Character[], Character>): void {
    moveItemInArray(roster.characters, event.previousIndex, event.currentIndex);
    roster.characters = roster.characters.map((c, i) => {
      return {
        ...c,
        index: i
      };
    });
    this.rosterService.updateOne(roster.$key, { characters: roster.characters });
  }
}
