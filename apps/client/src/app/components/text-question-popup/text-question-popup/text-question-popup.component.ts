import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";

export interface DialogData {
  title: string
  baseText: string;
  placeholder: string;
  type: "textarea" | "input";
}

@Component({
  selector: "lostark-helper-text-question-popup",
  templateUrl: "./text-question-popup.component.html",
  styleUrls: ["./text-question-popup.component.less"]
})
export class TextQuestionPopupComponent implements OnInit {
  public control!: FormControl;

  constructor(
    public modalRef: DialogRef,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {
  }

  public submit(): void {
    this.modalRef.close(this.control.value);
  }

  ngOnInit(): void {
    this.control = new FormControl(this.data.baseText, Validators.required);
  }

}
