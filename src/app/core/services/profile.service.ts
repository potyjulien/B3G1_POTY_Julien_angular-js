import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProfileUpdateInterface } from '../interfaces/profileUpdate.interface';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { User } from '../entities/user';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  updateChanges(updateChanges: ProfileUpdateInterface): Observable<any> {
    return this.httpClient.patch(
      `${environment.api}/api/profile`,
      updateChanges
    ).pipe(
      tap((user: User) => {
        AuthService.user = user;
        this.snackBar.open('Votre profil a été modifié', 'Fermer', {
          duration: 8000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      })
    );
  }

}
