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
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.cambioPasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onCambioPassword() {
    this.errorMessage = '';
    this.successMessage = '';
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
              this.successMessage = 'Cambio de contraseña Exitoso';
            },
            (err) => {
              console.error('Error, tu nueva contraseña es muy corta', err);
              this.errorMessage = 'Error, tu nueva contraseña es muy corta';
            }
          );
        } else {
          console.error('Las contraseñas no coinciden');
          this.errorMessage = 'Error las contraseñas no coinciden';
        }
      } else {
        console.error('Alguno de los controles de formulario es nulo');
        this.errorMessage = 'Error alguno de los controles de formulario es nulo';
      }
    }
  }
}
