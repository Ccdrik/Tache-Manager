import { Component } from '@angular/core';
import { TaskFormComponent } from '../tasks/task-form.component';
import { TaskListComponent } from '../tasks/task-list/task-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

}
