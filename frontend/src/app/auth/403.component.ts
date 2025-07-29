import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-unauthorized',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="text-center mt-5">
      <h2 class="text-danger">403 - Accès interdit</h2>
      <p>Vous n'avez pas les droits pour accéder à cette page.</p>
      <a routerLink="/login" class="btn btn-outline-primary mt-3">Retour à la connexion</a>
    </div>
  `
})
export class UnauthorizedComponent { }

