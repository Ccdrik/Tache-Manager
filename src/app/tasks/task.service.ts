import { Injectable } from '@angular/core';

// Déclare ce service comme injectable dans tout le projet
@Injectable({
    providedIn: 'root',
})
export class TaskService {
    // Liste des tâches simulée
    private tasks: { id: number; titre: string; faite: boolean; description?: string }[] = [
        { id: 1, titre: 'Tâche 1', faite: false, description: 'desc 1' },
        { id: 2, titre: 'Tâche 2', faite: true, description: 'desc 2' }
    ];


    //  Méthode pour récupérer toutes les tâches
    getTasks(): { id: number; titre: string; faite: boolean; description?: string }[] {
        return this.tasks;
    }

    //  Ajouter une tâche
    addTask(titre: string) {
        const nouvelleTache = {
            id: Date.now(), // identifiant unique
            titre,
            description: '',
            faite: false
        };
        this.tasks.push(nouvelleTache);
        this.saveTasks(); // sauvegarde dans le localStorage
    }

    // Marquer une tâche comme faite
    toggleDone(id: number) {
        const task = this.tasks.find(t => t.id === id);
        if (task) task.faite = !task.faite;
        this.saveTasks(); // sauvegarde dans le localStorage
    }

    //  Supprimer une tâche
    deleteTask(id: number) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks(); // sauvegarde dans le localStorage
    }
    private saveTasks(): void {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    constructor() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
    }
    updateTask(id: number, titre: string, description: string): void {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.titre = titre;
            task.description = description;
            this.saveTasks();
        }
    }


}
