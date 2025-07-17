import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: { email: string; role: string }[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.authService.getAllUsers();
  }

  promote(email: string) {
    this.authService.promoteToAdmin(email);
    this.loadUsers();
  }

  delete(email: string) {
    this.authService.deleteUser(email);
    this.loadUsers();
  }

  getCurrentUser(): string | null {
    return this.authService.getUser();
  }
}
