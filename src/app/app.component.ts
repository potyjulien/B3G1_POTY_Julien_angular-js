import { Component } from '@angular/core';
import { SessionService } from './core/services/session.service';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  get isSignedIn(): boolean {
    return AuthService.isSignedIn;
  }

  get isAdmin(): boolean {
    return AuthService.isAdmin;
  }

  signout() {
    // supprimer les données de sessions et retourner à la landing page
    this.router.navigate(['/auth']).then(() => {
      this.sessionService.clear();
      AuthService.user = null;
      this.snackBar.open('Déconnexion réussie', 'Fermer', {
        duration: 8000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    });
  }

}
