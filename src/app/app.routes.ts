import { Routes } from '@angular/router';
import { UserDashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TachesComponent } from './tasks/taches.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UnauthorizedComponent } from './auth/403.component';
import { AdminGuard } from './auth/admin.guard';


// Définition des routes de l'application

export const routes: Routes = [
    // Redirection par défaut vers login
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    //  Module d'authentification (lazy loading)
    {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },

    //  Connexion / Inscription publiques
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    //  Pages protégées par AuthGuard
    { path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },
    { path: 'taches', component: TachesComponent, canActivate: [AuthGuard] },
    { path: 'taches/ajouter', component: TaskCreateComponent, canActivate: [AuthGuard] },
    { path: 'taches/edit/:id', component: TaskEditComponent, canActivate: [AuthGuard] },
    { path: 'task-list', component: TaskListComponent, canActivate: [AuthGuard] },
    { path: 'profile', loadComponent: () => import('./profil/user-profile.component').then(m => m.UserProfileComponent), canActivate: [AuthGuard] },
    { path: 'calendar', loadComponent: () => import('./calendar/task-calendar.component').then(m => m.TaskCalendarComponent), canActivate: [AuthGuard] },

    //  Admin uniquement
    { path: 'admin', loadComponent: () => import('./dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent), canActivate: [AuthGuard, AdminGuard] },

    //  403 non autorisé
    { path: '403', component: UnauthorizedComponent },

    //  Page d’accueil publique
    { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },


    { path: '**', redirectTo: 'login' }
];
