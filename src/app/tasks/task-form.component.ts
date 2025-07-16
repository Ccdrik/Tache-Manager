import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) { }

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle.trim());
      this.newTaskTitle = ''; // Réinitialise le champ après ajout
    }
  }
}
