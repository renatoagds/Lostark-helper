import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChecklistComponent } from "./checklist/checklist.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { CharacterCardModule } from "../../components/character-card/character-card.module";
import { TaskCardModule } from "../../components/task-card/task-card.module";

const routes = [{
  path: "",
  component: ChecklistComponent
}];

@NgModule({
  declarations: [ChecklistComponent],
  exports: [
    ChecklistComponent
  ],
  imports: [
    CommonModule,
    CharacterCardModule,
    TaskCardModule,
    RouterModule.forChild(routes),
    FormsModule,
    NzStatisticModule,
  ]
})
export class ChecklistModule {
}
