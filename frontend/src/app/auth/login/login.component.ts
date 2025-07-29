import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const redirect = this.route.snapshot.queryParams['redirect'];
    if (redirect) {
      this.message = 'Veuillez vous connecter pour accéder à cette page.';
    }
  }

  onSubmit(): void {
    this.authService.login(this.email, this.password).then(success => {
      console.log('✅ Login tenté, succès :', success); // AJOUT ICI

      if (success) {
        this.message = 'Connexion réussie !';

        const role = this.authService.getRole();
        console.log('🧑‍💼 Rôle de l’utilisateur connecté :', role); // AJOUT

        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/taches']);
        }
      } else {
        this.message = 'Email ou mot de passe incorrect.';
      }
    });
  }
}
