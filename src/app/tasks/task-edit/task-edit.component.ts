import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  id!: number;

  task: Task = {
    id: 0,
    titre: '',
    description: '',
    date: '',
    faite: false,
    checklist: []
  };

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(this.id).subscribe((data) => {
      this.task = data;
    });
  }

  update(): void {
    this.taskService.updateTask(this.id, this.task).subscribe(() => {
      this.router.navigate(['/taches']);
    });
  }


  newChecklistItem: string = '';

  addChecklistItem(): void {
    if (this.newChecklistItem.trim() && this.task && this.task.checklist) {
      this.task.checklist.push({ label: this.newChecklistItem.trim(), checked: false });
      this.newChecklistItem = '';
    }
  }

  removeChecklistItem(index: number): void {
    if (this.task && this.task.checklist) {
      this.task.checklist.splice(index, 1);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

}
