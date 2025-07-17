import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalTasks: number = 0;
  doneTasks: number = 0;
  undoneTasks: number = 0;
  donePercentage: number = 0;

  constructor(private authService: AuthService, private taskService: TaskService) { }

  ngOnInit(): void {
    // Récupère le nombre d'utilisateurs
    const users = this.authService.getAllUsers();
    this.totalUsers = users.length;

    // Additionne les tâches de tous les utilisateurs
    this.totalTasks = 0;
    this.doneTasks = 0;
    this.undoneTasks = 0;

    users.forEach(user => {
      const tasksKey = `tasks_${user.email}`;
      const tasks: Task[] = JSON.parse(localStorage.getItem(tasksKey) || '[]');
      this.totalTasks += tasks.length;
      this.doneTasks += tasks.filter(t => t.faite).length;
      this.undoneTasks += tasks.filter(t => !t.faite).length;
    });

    this.donePercentage = this.totalTasks > 0
      ? Math.round((this.doneTasks / this.totalTasks) * 100)
      : 0;
  }
}
