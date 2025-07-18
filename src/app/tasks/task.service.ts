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
    checklist?: { label: string; checked: boolean }[];
    auteur?: string;
}

export interface ChecklistItem {
    id: number;
    taskId: number;
    content: string;
    done: boolean;
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

    toggleChecklistItem(task: Task, index: number): Observable<any> {

        const updatedChecklist = [...(task.checklist || [])];

        updatedChecklist[index].checked = !updatedChecklist[index].checked;

        //  On crée un nouvel objet tâche mis à jour
        const updatedTask: Task = {
            ...task,
            checklist: updatedChecklist
        };

        return this.updateTask(task.id, updatedTask); // Envoi du PUT

    }


    getTaskCount(): Observable<{ total: number }> {
        return this.http.get<{ total: number }>('http://localhost:3000/api/stats/tasks/count');
    }

    getDoneTaskCount(): Observable<{ done: number }> {
        return this.http.get<{ done: number }>('http://localhost:3000/api/stats/tasks/done');
    }

    getUserCount(): Observable<{ total: number }> {
        return this.http.get<{ total: number }>('http://localhost:3000/api/stats/users/count');
    }

}
