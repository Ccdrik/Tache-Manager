import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service'; // ajuste le chemin si ton fichier auth est ailleurs

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    userEmail: string | null = null;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.userEmail = this.authService.getUser();
    }

    isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }
}
