import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../task.service';
import { RouterModule, Router } from '@angular/router';
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

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  /** ✅ Charge toutes les tâches depuis l'API */
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

  /** ✅ Ajoute une tâche rapide sans passer par le formulaire avancé */
  addTask(): void {
    const newTask: Omit<Task, 'id'> = {
      titre: 'Nouvelle tâche rapide',
      description: '',
      faite: false,
      date: new Date().toISOString(),
      checklist: []
    };

    this.taskService.addTask(newTask).subscribe(() => {
      this.loadTasks();
      this.showAlert('Nouvelle tâche créée.', 'success');
    });
  }

  /** ✅ Supprime une tâche par son id */
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
      this.showAlert('Tâche supprimée avec succès.', 'success');
    });
  }

  /** ✅ Change l'état "faite" d'une tâche */
  toggleDone(task: Task): void {
    this.taskService.toggleDone(task).subscribe(() => {
      this.loadTasks();
    });
  }

  /** ✅ Applique les filtres et le tri */
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
      filtered = filtered.filter(task => task.date?.split('T')[0] === this.selectedDate);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.date || '');
      const dateB = new Date(b.date || '');
      return this.sortDescending ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

    this.tasks = filtered;
  }

  /** ✅ Inverse l'ordre de tri */
  toggleSortOrder(): void {
    this.sortDescending = !this.sortDescending;
    this.applyFilter();
  }

  /** ✅ Affiche un message d'alerte temporaire */
  showAlert(message: string, type: 'success' | 'danger'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => this.alertMessage = '', 3000);
  }

  /** ✅ Coche/décoche un élément de checklist */
  toggleChecklistItem(task: Task, index: number): void {
    this.taskService.toggleChecklistItem(task, index).subscribe(() => {
      this.loadTasks();
    });
  }

  /** ✅ Edition d'une tâche */
  editTask(task: Task): void {
    this.router.navigate(['/taches/edit', task.id]);
  }
}
