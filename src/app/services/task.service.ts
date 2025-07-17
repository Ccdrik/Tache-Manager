import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export interface Task {
    id: number;
    titre: string;
    description?: string;
    date?: string;
    faite: boolean;
    checklist?: { label: string; fait: boolean }[];
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks: Task[] = [];

    constructor(private authService: AuthService) {
        this.loadTasks();
    }

    //  Génère la clé personnalisée pour chaque utilisateur
    private getStorageKey(): string {
        const email = this.authService.getUser();
        return email ? `tasks_${email}` : 'tasks_guest';
    }

    //  Charge les tâches depuis localStorage
    private loadTasks(): void {
        const data = localStorage.getItem(this.getStorageKey());
        this.tasks = data ? JSON.parse(data) : [];
    }

    //  Sauvegarde les tâches dans localStorage
    private saveTasks(): void {
        localStorage.setItem(this.getStorageKey(), JSON.stringify(this.tasks));
    }

    getTasks(): Task[] {
        return this.tasks;
    }

    addTask(
        titre: string,
        description: string = '',
        date: string = '',
        checklist: { label: string; fait: boolean }[] = []
    ): void {
        const nouvelleTache: Task = {
            id: Date.now(),
            titre,
            description,
            faite: false,
            date,
            checklist
        };
        this.tasks.push(nouvelleTache);
        this.saveTasks();
    }


    toggleDone(id: number): void {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.faite = !task.faite;
            this.saveTasks();
        }
    }

    deleteTask(id: number): void {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
    }

    updateTask(
        id: number,
        titre: string,
        description: string,
        date: string,
        checklist: { label: string; fait: boolean }[]
    ): void {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.titre = titre;
            task.description = description;
            task.date = date;
            task.checklist = checklist;
            this.saveTasks();
        }
    }

    toggleChecklistItem(taskId: number, index: number): void {
        const task = this.tasks.find(t => t.id === taskId);
        if (task?.checklist && task.checklist[index]) {
            task.checklist[index].fait = !task.checklist[index].fait;
            this.saveTasks();
        }
    }
}
