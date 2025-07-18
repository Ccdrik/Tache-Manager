import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface Task {
    id: number;
    titre: string;
    description?: string;
    faite: boolean;
    date?: string;
    checklist?: { label: string; checked: boolean }[];
    auteur?: string;
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:3000/tasks'; // backend API

    constructor(private http: HttpClient, private authService: AuthService) { }

    private fromApi(apiTask: any): Task {
        return {
            id: apiTask.id,
            titre: apiTask.title,
            description: apiTask.description,
            date: apiTask.date,
            faite: !!apiTask.done,
            checklist: typeof apiTask.checklist === 'string' ? JSON.parse(apiTask.checklist) : (apiTask.checklist || []),
            auteur: apiTask.auteur
        };
    }

    private toApi(task: Omit<Task, 'id'> | Task): any {
        return {
            title: task.titre,
            description: task.description,
            date: task.date,
            done: task.faite,
            checklist: JSON.stringify(task.checklist || []),
            auteur: task.auteur
        };
    }

    getTasks(): Observable<Task[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map(tasks => tasks.map(t => this.fromApi(t)))
        );
    }

    getTaskById(id: number): Observable<Task> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            map(t => this.fromApi(t))
        );
    }

    addTask(task: Omit<Task, 'id'>): Observable<Task> {
        const userEmail = this.authService.getUser() ?? '';  // Si null, on met ''
        const newTask = { ...task, auteur: userEmail };
        return this.http.post<Task>(this.apiUrl, this.toApi(newTask));
    }

    updateTask(id: number, task: Task): Observable<Task> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, this.toApi(task)).pipe(
            map(t => this.fromApi(t))
        );
    }

    deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    toggleDone(task: Task): Observable<Task> {
        const updatedTask = { ...task, faite: !task.faite };
        return this.updateTask(task.id, updatedTask);
    }

    toggleChecklistItem(task: Task, index: number): Observable<Task> {
        const updatedChecklist = [...(task.checklist || [])];
        updatedChecklist[index].checked = !updatedChecklist[index].checked;
        const updatedTask: Task = { ...task, checklist: updatedChecklist };
        return this.updateTask(task.id, updatedTask);
    }
}
