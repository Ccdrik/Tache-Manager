import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../tasks/task.service';
import { ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  totalTasks = 0;
  doneTasks = 0;
  undoneTasks = 0;

  public pieChartData = {
    labels: ['Terminées', 'En cours'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#198754', '#0d6efd'],
      }
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

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      const currentUser = localStorage.getItem('currentUser');
      const userEmail = currentUser ? JSON.parse(currentUser).email : null;
      console.log(' Utilisateur connecté :', userEmail);
      console.log(' Tâches récupérées :', tasks);

      if (!userEmail) return;

      const userTasks = tasks.filter(t => t.auteur === userEmail);
      console.log(' Tâches de cet utilisateur :', userTasks);

      this.totalTasks = userTasks.length;
      this.doneTasks = userTasks.filter(t => t.faite).length;
      this.undoneTasks = userTasks.filter(t => !t.faite).length;

      this.pieChartData.datasets[0].data = [this.doneTasks, this.undoneTasks];
      this.cdr.detectChanges();
    });
  }
}
