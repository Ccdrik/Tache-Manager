import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly storageKey = 'users';
    private readonly currentUserKey = 'currentUser';

    constructor() { }

    // Enregistrement d’un utilisateur
    register(email: string, password: string, role: string = 'user'): boolean {
        const users = this.getAllUsers();
        const userExists = users.some(u => u.email === email);

        if (userExists) return false;

        users.push({ email, password, role }); // 🟢 Ajout du rôle
        localStorage.setItem(this.storageKey, JSON.stringify(users));
        return true;
    }

    // Connexion utilisateur
    login(email: string, password: string): boolean {
        const users = this.getAllUsers();
        const match = users.find(u => u.email === email && u.password === password);

        if (match) {
            localStorage.setItem(this.currentUserKey, email);
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
        return localStorage.getItem(this.currentUserKey);
    }

    // Récupère tous les utilisateurs
    private getAllUsers(): { email: string; password: string; role: string }[] {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }
    getRole(): string | null {
        const email = this.getUser();
        const users = this.getAllUsers();
        const user = users.find(u => u.email === email);
        return user?.role || null;
    }
    isAdmin(): boolean {
        return this.getRole() === 'admin';
    }
}
