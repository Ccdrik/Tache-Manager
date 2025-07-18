import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../tasks/task.service';
import { TaskFormComponent } from '../tasks/task-form.component';
import { TaskListComponent } from '../tasks/task-list/task-list.component';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  userEmail = '';
  total = 0;
  done = 0;
  pending = 0;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userEmail = user.email;

    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      const userTasks = tasks.filter(t => t.auteur === this.userEmail);
      this.total = userTasks.length;
      this.done = userTasks.filter(t => t.faite).length;
      this.pending = userTasks.filter(t => !t.faite).length;
    });
  }
}
