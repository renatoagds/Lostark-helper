import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from './task-card/task-card.component';

@NgModule({
  declarations: [TaskCardComponent],
  exports: [TaskCardComponent],
  imports: [CommonModule]
})
export class TaskCardModule {}
