import { Component, Inject } from "@angular/core";
import {  DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";

export type DialogData = {
    description: string;
}

@Component({
  selector: "lostark-helper-text-question-popup",
  templateUrl: "./confirm-popup.component.html",
})
export class ConfirmPopupComponent {
  constructor(
    public modalRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData,
  ) {
  }
}
