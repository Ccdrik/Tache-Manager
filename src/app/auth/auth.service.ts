import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly storageKey = 'users';
    private readonly currentUserKey = 'currentUser';

    constructor() {
        this.initDefaultAdmin();
    }

    // Enregistrement d’un utilisateur
    register(email: string, password: string, role: string = 'user'): boolean {
        const users = this.getAllUsers();
        const userExists = users.some(u => u.email === email);

        if (userExists) return false;

        users.push({ email, password, role }); //  Ajout du rôle
        localStorage.setItem(this.storageKey, JSON.stringify(users));
        return true;
    }

    // Connexion utilisateur
    login(email: string, password: string): boolean {
        const users = this.getAllUsers();
        const match = users.find(u => u.email === email && u.password === password);

        if (match) {
            localStorage.setItem(this.currentUserKey, JSON.stringify(match)); //  on stocke tout l’objet
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
        const email = this.getUser();
        const users = this.getAllUsers();
        const user = users.find(u => u.email === email);
        return user?.role || null;
    }
    isAdmin(): boolean {
        return this.getRole() === 'admin';

    }
    // 🔓 Permet à l'admin de voir la liste des utilisateurs
    getAllUsers(): { email: string; password: string; role: string }[] {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    // 🔴 Supprimer un utilisateur (sauf lui-même)
    deleteUser(email: string): void {
        const users = this.getAllUsers().filter(u => u.email !== email);
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    // 🟢 Promouvoir un utilisateur en admin
    promoteToAdmin(email: string): void {
        const users = this.getAllUsers().map(u =>
            u.email === email ? { ...u, role: 'admin' } : u
        );
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    getCurrentUser(): any {
        return JSON.parse(localStorage.getItem('currentUser') || 'null');
    }



    private initDefaultAdmin(): void {
        const users = this.getAllUsers();
        const adminExists = users.some(user => user.role === 'admin');

        if (!adminExists) {
            const defaultAdmin = {
                email: 'admin@mail.com',
                password: 'admin123',
                role: 'admin'
            };

            users.push(defaultAdmin);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

}
