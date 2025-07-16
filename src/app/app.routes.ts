import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TachesComponent } from './tasks/taches.component';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UnauthorizedComponent } from './auth/403.component';
import { AdminGuard } from './auth/admin.guard';
import { AdminComponent } from './admin/admin.component';

// Définition des routes de l'application

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection vers la page de connexion par défaut
    {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) // Chargement paresseux du module d'authentification
    },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Accès protégé par AuthGuard
    { path: 'taches', component: TachesComponent, canActivate: [AuthGuard] },
    { path: 'taches/ajouter', component: TaskCreateComponent, canActivate: [AuthGuard] },
    { path: 'taches/modifier/:id', component: TaskEditComponent, canActivate: [AuthGuard] },
    { path: 'taches/edit/:id', component: TaskEditComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent }, //  accès public
    { path: 'login', component: LoginComponent },       //  accès public
    { path: 'task-list', component: TaskListComponent, canActivate: [AuthGuard] },
    { path: '403', component: UnauthorizedComponent },  // Page d'erreur 403 pour accès non autorisé
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },

];