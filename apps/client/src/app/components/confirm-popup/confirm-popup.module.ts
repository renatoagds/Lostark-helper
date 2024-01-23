import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmPopupComponent } from "./confirm-popup/confirm-popup.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ConfirmPopupComponent]
})
export class ConfirmPopupModule {
}
