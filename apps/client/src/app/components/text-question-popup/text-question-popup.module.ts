import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TextQuestionPopupComponent } from "./text-question-popup/text-question-popup.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [TextQuestionPopupComponent]
})
export class TextQuestionPopupModule {
}
