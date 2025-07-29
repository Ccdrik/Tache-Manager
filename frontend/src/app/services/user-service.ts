import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
    email: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/users';

    constructor(private http: HttpClient) { }

    //  Obtenir la liste des utilisateurs
    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    // ⬆ Promouvoir un utilisateur
    promote(email: string): Observable<any> {
        return this.http.put(`${this.apiUrl}/promote/${email}`, {});
    }

    //  Supprimer un utilisateur
    delete(email: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${email}`);
    }
}
