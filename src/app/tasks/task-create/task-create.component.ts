import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {
  titre = '';
  description = '';
  date = '';

  constructor(private taskService: TaskService, private router: Router) { }

  add(): void {
    if (this.titre.trim()) {
      const newTask: Omit<Task, 'id'> = {
        titre: this.titre.trim(),
        description: this.description.trim(),
        date: this.date,
        faite: false
      };

      this.taskService.addTask(newTask).subscribe(() => {
        this.router.navigate(['/taches']);
      });
    }
  }
}
