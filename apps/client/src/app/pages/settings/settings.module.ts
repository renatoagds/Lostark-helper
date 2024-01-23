import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SettingsComponent } from "./settings/settings.component";
import { RosterComponent } from "./roster/roster.component";
// import { TasksComponent } from "./tasks/tasks.component";
import { RouterModule, Routes } from "@angular/router";
// import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
// import { NzGridModule } from "ng-zorro-antd/grid";
// import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { NzTableModule } from "ng-zorro-antd/table";
// import { NzSwitchModule } from "ng-zorro-antd/switch";
// import { NzCardModule } from "ng-zorro-antd/card";
// import { NzInputNumberModule } from "ng-zorro-antd/input-number";
// import { NzButtonModule } from "ng-zorro-antd/button";
// import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
// import { NzToolTipModule } from "ng-zorro-antd/tooltip";
// import { NzEmptyModule } from "ng-zorro-antd/empty";
// import { NzInputModule } from "ng-zorro-antd/input";
// import { NzSelectModule } from "ng-zorro-antd/select";
// import { NzFormModule } from "ng-zorro-antd/form";
// import { NzMessageModule } from "ng-zorro-antd/message";
// import { IconsProviderModule } from "../../icons-provider.module";
// import { NzModalModule } from "ng-zorro-antd/modal";
import { DragDropModule } from "@angular/cdk/drag-drop";
// import { NzListModule } from "ng-zorro-antd/list";
// import { NzDividerModule } from "ng-zorro-antd/divider";
import { TextQuestionPopupModule } from "../../components/text-question-popup/text-question-popup.module";
import { CharacterCardModule } from "../../components/character-card/character-card.module";

const routes: Routes = [{
  path: "",
  component: SettingsComponent
}];

@NgModule({
  declarations: [RosterComponent, SettingsComponent],
  // declarations: [RosterComponent, TasksComponent, SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    TextQuestionPopupModule,
    CharacterCardModule,
    DragDropModule,

    // IconsProviderModule,
    // NzPageHeaderModule,
    // NzGridModule,
    // NzCheckboxModule,
    // NzTableModule,
    // NzSwitchModule,
    // NzCardModule,
    // NzInputNumberModule,
    // NzButtonModule,
    // NzPopconfirmModule,
    // NzToolTipModule,
    // NzEmptyModule,
    // NzInputModule,
    // NzSelectModule,
    // NzFormModule,
    // NzMessageModule,
    // NzModalModule,
    // NzListModule,
    // NzDividerModule,
  ]
})
export class SettingsModule {
}
