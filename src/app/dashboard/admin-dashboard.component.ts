import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { TaskService, Task } from '../services/task.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  totalUsers = 0;
  totalTasks = 0;
  doneTasks = 0;
  undoneTasks = 0;
  donePercentage = 0;

  public pieChartData = {
    labels: ['Terminées', 'En cours'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#198754', '#0d6efd'], // vert / bleu
      },
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };



  constructor(private authService: AuthService, private taskService: TaskService) { }

  ngOnInit(): void {
    const users = this.authService.getAllUsers();
    this.totalUsers = users.length;

    users.forEach(user => {
      const tasksKey = `tasks_${user.email}`;
      const tasks: Task[] = JSON.parse(localStorage.getItem(tasksKey) || '[]');
      this.totalTasks += tasks.length;
      this.doneTasks += tasks.filter(t => t.faite).length;
      this.undoneTasks += tasks.filter(t => !t.faite).length;
      this.donePercentage = this.totalTasks > 0 ? Math.round((this.doneTasks / this.totalTasks) * 100) : 0;
      this.pieChartData.datasets[0].data = [this.doneTasks, this.undoneTasks];
    });




  }
}
