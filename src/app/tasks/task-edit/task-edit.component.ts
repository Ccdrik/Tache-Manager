import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  id!: number;
  titre: string = '';
  description: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    const task = this.taskService.getTasks().find(t => t.id === this.id);
    if (task) {
      this.titre = task.titre;
      this.description = task.description || '';
    }
  }

  onSubmit() {
    this.taskService.updateTask(this.id, this.titre, this.description);
    this.router.navigate(['/taches']);
  }


  annuler() {
    this.router.navigate(['/taches']);
  }


}
