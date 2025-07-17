import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//  Définition du type de tâche
export interface Task {
    id: number;
    titre: string;
    description?: string;
    faite: boolean;
    date?: string;
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:3000/api/tasks'; //  URL backend Node.js

    constructor(private http: HttpClient) { }

    //  Récupérer toutes les tâches (GET)
    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }

    //  Ajouter une tâche (POST)
    addTask(task: Omit<Task, 'id'>): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, task);
    }

    //  Supprimer une tâche (DELETE)
    deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    //  Modifier une tâche (PUT)
    updateTask(id: number, task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
    }

    //  Inverser l'état "faite" (PUT)
    toggleDone(task: Task): Observable<any> {
        const updatedTask = { ...task, faite: task.faite ? 0 : 1 };
        return this.http.put(`${this.apiUrl}/${task.id}`, updatedTask);
    }

    getTaskById(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${id}`);
    }
}
