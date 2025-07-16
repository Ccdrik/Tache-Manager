import { NgModule } from '@angular/core'; // Importation du décorateur NgModule
import { CommonModule } from '@angular/common';// Importation de CommonModule pour les fonctionnalités de base d'Angular
import { FormsModule } from '@angular/forms';// Importation de FormsModule pour la gestion des formulaires
import { AuthRoutingModule } from './auth-routing.module';// Importation du module de routage spécifique à l'authentification
import { LoginComponent } from './login/login.component'; // Importation du composant de connexion
import { RegisterComponent } from './register/register.component'; // Importation du composant d'enregistrement

@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule, // Importation de CommonModule pour les directives Angular de base
    AuthRoutingModule, // Importation du module de routage spécifique à l'authentification
    FormsModule, // Ajout de FormsModule pour la gestion des formulaires
    LoginComponent, // Déclaration du composant de connexion
    RegisterComponent // Déclaration du composant d'enregistrement
  ]
})
export class AuthModule { }
