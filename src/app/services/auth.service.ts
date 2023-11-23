import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private hosting: string = 'http://127.0.0.1:8000/';
  private action: string = 'api/auth/login';
  private cambioPasswordEndpoint: string = 'api/auth/cambio-password'
  private isLogin: boolean = false;
  private authSecretKey: string = 'Token_Bearer';
  private options: any;

  constructor(private http: HttpClient) {
    
    this.isLogin = !!localStorage.getItem(this.authSecretKey);
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-type': 'application/json',
      }),
    };
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post(
      this.hosting + this.action,
      { email, password },
      this.options
    ).pipe(
      catchError((error) => {
        return throwError('Usuario o contraseña incorrectos');
      })
    );
  }
  isUserLogin(): boolean {
    return this.isLogin;
  }
  logout(): void {
    localStorage.removeItem(this.authSecretKey);
    this.isLogin = false;
  }
  setTokeSecretKey(tokeSecret: string) {
    localStorage.setItem(this.authSecretKey, tokeSecret);
    this.isLogin = true;
  }
  cambioPassword(currentPassword: string, newPassword: string): Observable<any> {
    const requestBody = {
      current_password: currentPassword,
      new_password: newPassword,
    };
    // Realiza la solicitud POST al endpoint de cambio de contraseña
    return this.http.post(
      this.hosting + this.cambioPasswordEndpoint,
      requestBody
    );
  }
}
