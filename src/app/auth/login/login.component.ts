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
    const success = this.authService.login(this.email, this.password);

    if (success) {
      this.message = 'Connexion réussie !';

      //  Redirection en fonction du rôle
      const role = this.authService.getRole();

      if (role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/taches']);
      }

    } else {
      this.message = 'Email ou mot de passe incorrect.';
    }
  }
}
