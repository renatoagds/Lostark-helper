import { Component, Input } from "@angular/core";

@Component({
  selector: "lostark-helper-task-card",
  templateUrl: "./task-card.component.html",
})
export class TaskCardComponent {
  @Input() done = false;
  @Input() class = "flex-1";
  @Input() icon = "";
  @Input() label = "";
}
