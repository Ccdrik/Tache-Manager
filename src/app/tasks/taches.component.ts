import { Component } from '@angular/core';
import { TaskFormComponent } from './task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-taches',
    standalone: true,
    imports: [CommonModule, TaskFormComponent, TaskListComponent],
    template: `
    <div class="container">
      <h1 class="mt-4 mb-4 text-center">Mes tâches</h1>
      <app-task-form></app-task-form>
      <app-task-list></app-task-list>
    </div>
  `
})
export class TachesComponent { }
