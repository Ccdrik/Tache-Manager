import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: { id: number; titre: string; faite: boolean }[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  //  C'EST ICI qu'on ajoute la méthode :
  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks(); // mise à jour de la liste
  }
  toggleDone(id: number): void {
    this.taskService.toggleDone(id);
    this.tasks = this.taskService.getTasks(); // mise à jour de la liste
  }
}
