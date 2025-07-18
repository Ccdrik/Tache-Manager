import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../services/user-service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  promote(email: string): void {
    this.userService.promote(email).subscribe(() => {
      this.loadUsers();
    });
  }

  delete(email: string): void {
    this.userService.delete(email).subscribe(() => {
      this.loadUsers();
    });
  }

  getCurrentUser(): string | null {
    return this.authService.getUser();
  }
}
