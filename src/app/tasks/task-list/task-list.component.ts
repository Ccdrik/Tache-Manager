import { Component, OnInit } from '@angular/core'; // Importation du décorateur Component pour créer un composant Angular
import { CommonModule } from '@angular/common'; // Importation de CommonModule pour les directives Angular de base
import { TaskService } from '../task.service'; // Import du service TaskService
import { RouterModule } from '@angular/router'; // Importation de FormsModule pour la gestion des formulaires

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: { id: number; titre: string; faite: boolean; description?: string }[] = [];

  //  Injection du service via le constructeur
  constructor(private taskService: TaskService) { }

  //  Récupération des tâches au démarrage du composant
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks(); // mise à jour de la liste
  }

  // Marquer comme faite / non faite
  toggleDone(id: number): void {
    this.taskService.toggleDone(id);
    this.tasks = this.taskService.getTasks(); // mise à jour de l'affichage
  }
}