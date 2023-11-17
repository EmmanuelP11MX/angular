import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    loginForm?: any;
    isLoggedIn = false; // Propiedad para rastrear el estado de inicio de sesión
    errorMessage: string = '';
    constructor(
        private formBuil: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        //si esta isLogin entonces mandar a ruta /
        if (this.authService.isUserLogin()) {
            this.router.navigate(['/']);
        }
        this.loginForm = this.formBuil.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
    onSubmit() {
        this.errorMessage = ''; // Limpiar el mensaje de error al intentar iniciar sesión nuevamente
        
        if (this.loginForm.valid) {
            const email = this.loginForm.get('email').value;
            const password = this.loginForm.get('password').value;

            this.authService.login(email, password).subscribe({
                next: (resp) => {
                    if (resp.status) {
                        const token = resp.access_token;
                        this.authService.setTokeSecretKey(token);
                        // Actualiza el estado de inicio de sesión
                        this.isLoggedIn = true;
                        this.router.navigate(['/']);
                        // Recarga la página después de un inicio de sesión exitoso
                        window.location.reload();
                    }
                },
                error: (err) => {
                    // Manejar el error y mostrar un mensaje al usuario
                    console.error('Error de autenticación:', err);
                    this.errorMessage = err; // Asignar el mensaje de error para mostrar en la interfaz de usuario
                },
            });
        }
    }
}
