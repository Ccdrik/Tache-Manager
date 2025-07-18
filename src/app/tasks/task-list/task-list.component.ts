import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../task.service';
import { RouterModule } from '@angular/router';
import { AlertComponent } from '../../shared/alert.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, AlertComponent, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  allTasks: Task[] = [];
  tasks: Task[] = [];
  filter: 'all' | 'done' | 'undone' = 'all';
  selectedDate: string = '';
  sortDescending: boolean = true;
  alertMessage: string = '';
  alertType: 'success' | 'danger' = 'success';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      data.forEach(task => {
        if (typeof task.checklist === 'string') {
          try {
            task.checklist = JSON.parse(task.checklist);
          } catch {
            task.checklist = [];
          }
        }
      });
      this.allTasks = data;
      this.applyFilter();
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
      this.showAlert('Tâche supprimée avec succès.', 'success');
    });
  }

  toggleDone(task: Task): void {
    this.taskService.toggleDone(task).subscribe(() => {
      this.loadTasks();
    });
  }

  applyFilter(): void {
    let filtered = [...this.allTasks];

    switch (this.filter) {
      case 'done':
        filtered = filtered.filter(task => task.faite);
        break;
      case 'undone':
        filtered = filtered.filter(task => !task.faite);
        break;
    }

    if (this.selectedDate) {
      filtered = filtered.filter(task => task.date === this.selectedDate);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date || '');
      const dateB = new Date(b.date || '');
      return this.sortDescending ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    this.tasks = filtered;
  }

  toggleSortOrder(): void {
    this.sortDescending = !this.sortDescending;
    this.applyFilter();
  }

  showAlert(message: string, type: 'success' | 'danger'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => this.alertMessage = '', 3000);
  }

  toggleChecklistItem(task: Task, index: number): void {
    this.taskService.toggleChecklistItem(task, index).subscribe(() => {
      this.loadTasks();
    });
  }
}
