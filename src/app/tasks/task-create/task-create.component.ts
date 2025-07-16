import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {
  titre = '';

  constructor(private taskService: TaskService, private router: Router) { }

  add(): void {
    if (this.titre.trim()) {
      this.taskService.addTask(this.titre.trim());
      this.router.navigate(['/taches']);
    }
  }
}
