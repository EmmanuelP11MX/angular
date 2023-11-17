import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.css']
})
export class CambioPasswordComponent implements OnInit{
  cambioPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.cambioPasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onCambioPassword() {
    if (this.cambioPasswordForm && this.cambioPasswordForm.valid) {
      const currentPasswordControl = this.cambioPasswordForm.get('currentPassword');
      const newPasswordControl = this.cambioPasswordForm.get('newPassword');
      const confirmPasswordControl = this.cambioPasswordForm.get('confirmPassword');
  
      if (currentPasswordControl && newPasswordControl && confirmPasswordControl) {
        const currentPassword = currentPasswordControl.value;
        const newPassword = newPasswordControl.value;
        const confirmPassword = confirmPasswordControl.value;
  
        // Verifica que las contraseñas coincidan
        if (newPassword === confirmPassword) {
          this.authService.cambioPassword(currentPassword, newPassword).subscribe(
            (resp) => {
              console.log('Contraseña cambiada exitosamente');
              // Puedes agregar lógica adicional, como redirigir a otra página o mostrar un mensaje de éxito.
            },
            (err) => {
              console.error('Error al cambiar la contraseña:', err);
              // Puedes mostrar un mensaje de error al usuario.
            }
          );
        } else {
          console.error('Las contraseñas no coinciden');
          // Puedes mostrar un mensaje de error al usuario indicando que las contraseñas no coinciden.
        }
      } else {
        console.error('Alguno de los controles de formulario es nulo');
        // Puedes manejar este caso según tus necesidades.
      }
    }
  }
}
