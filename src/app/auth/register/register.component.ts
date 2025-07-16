import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  role = 'user'; // valeur par défaut
  message = '';

  isAdminLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {
    this.isAdminLoggedIn = this.authService.isAdmin();
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.message = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const success = this.authService.register(this.email, this.password, this.role);

    if (success) {
      this.message = 'Inscription réussie !';
      this.router.navigate(['/login']);
    } else {
      this.message = 'Cet email est déjà utilisé.';
    }
  }
}
