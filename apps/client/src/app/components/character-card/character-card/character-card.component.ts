import { Component, Input } from "@angular/core";
import { Character } from "../../../model/character/character";

@Component({
  selector: "lostark-helper-character-card",
  templateUrl: "./character-card.component.html",
})
export class CharacterCardComponent {
  @Input() character: Character = {} as Character;
}
