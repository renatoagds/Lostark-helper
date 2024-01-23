import { Component, Input } from "@angular/core";

export type ToastType = "success" | "error" | "info";

@Component({
  selector: "lostark-helper-toast",
  templateUrl: "./toast.component.html",
})
export class ToastComponent {
  @Input() public message: string = "";
  @Input() public type: ToastType = "success";
}
