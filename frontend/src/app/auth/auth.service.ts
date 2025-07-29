import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private readonly currentUserKey = 'currentUser';



    // Enregistrement d’un utilisateur
    async register(email: string, password: string, role: string = 'user'): Promise<boolean> {
        const response = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });

        return response.ok;
    }

    // Connexion utilisateur
    async login(email: string, password: string): Promise<boolean> {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }

        return false;
    }

    // Déconnexion
    logout(): void {
        localStorage.removeItem(this.currentUserKey);
    }

    // Vérifie si un utilisateur est connecté
    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.currentUserKey);
    }

    // Récupère l’email de l’utilisateur connecté
    getUser(): string | null {
        const user = this.getCurrentUser();
        return user?.email || null;
    }


    getRole(): string | null {
        const user = this.getCurrentUser();
        return user?.role || null;
    }

    isAdmin(): boolean {
        return this.getRole() === 'admin';

    }






    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }





}
