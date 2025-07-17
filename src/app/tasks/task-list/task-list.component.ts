import { Component, OnInit } from '@angular/core'; // Importation du décorateur Component pour créer un composant Angular
import { CommonModule } from '@angular/common'; // Importation de CommonModule pour les directives Angular de base
import { TaskService } from '../task.service'; // Import du service TaskService
import { RouterModule } from '@angular/router'; // Importation de FormsModule pour la gestion des formulaires
import { AlertComponent } from '../../shared/alert.component';
import { Task } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, AlertComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  allTasks: Task[] = [];
  tasks: Task[] = [];
  filter: 'all' | 'done' | 'undone' = 'all'; //  Filtre pour les tâches

  //  Injection du service via le constructeur
  constructor(private taskService: TaskService) { }

  //  Récupération des tâches au démarrage du composant
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.allTasks = data;
      this.applyFilter();
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.taskService.getTasks().subscribe(data => {
        this.allTasks = data;
        this.applyFilter();
        this.showAlert('Tâche supprimée avec succès.', 'success');
      });
    });
  }

  toggleDone(task: Task): void {
    this.taskService.toggleDone(task).subscribe(() => {
      this.taskService.getTasks().subscribe(data => {
        this.allTasks = data;
        this.applyFilter();
      });
    });
  }

  applyFilter(): void {
    switch (this.filter) {
      case 'done':
        this.tasks = this.allTasks.filter(task => task.faite);
        break;
      case 'undone':
        this.tasks = this.allTasks.filter(task => !task.faite);
        break;
      default:
        this.tasks = [...this.allTasks];
    }

  }

  printTasks(): void {
    window.print();
  }

  alertMessage: string = '';
  alertType: 'success' | 'danger' = 'success';

  showAlert(message: string, type: 'success' | 'danger'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => this.alertMessage = '', 3000); // disparaît après 3s
  }



}