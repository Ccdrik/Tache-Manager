import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { Task } from '../task.service';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {
  newTaskTitle = '';
  newTaskDescription = '';
  newTaskDate = '';
  newItemLabel = ''; // champ temporaire pour ajouter une ligne
  checklist: { label: string; checked: boolean }[] = [];

  constructor(private taskService: TaskService, private router: Router) { }

  addChecklistItem(): void {
    if (this.newItemLabel.trim()) {
      this.checklist.push({ label: this.newItemLabel.trim(), checked: false });
      this.newItemLabel = '';
    }
  }

  removeChecklistItem(index: number): void {
    this.checklist.splice(index, 1);
  }

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      const newTask: Omit<Task, 'id'> = {
        titre: this.newTaskTitle.trim(),
        description: this.newTaskDescription,
        date: this.newTaskDate,
        faite: false,
        checklist: this.checklist // 👈 ajouter ici
      };
      this.taskService.addTask(newTask).subscribe(() => {
        this.router.navigate(['/taches']);
      });
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
