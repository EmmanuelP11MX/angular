import { Component } from '@angular/core';
import { ItemMenu, env } from 'src/config/env';
import { Estudiante } from 'src/model/Estudiante';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listaMenu: Array<ItemMenu> = env.menu;

  title: string = 'Valor 1';
  textoPlaceholder: string = "Escribe algo aqui";
  imgSrc: string = "";
  texto: string = "";
  estudianteObj!: Estudiante;
  listaEstudiantes: Estudiante[] = [];
  isLoggedIn = false; // Propiedad para rastrear el estado de inicio de sesión

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

    // Verifica si el usuario ha iniciado sesión en el constructor
    this.isLoggedIn = this.authService.isUserLogin();
    //setInterval(() => this.title = "Nuevo valor", 3000);
    /*this.estudianteObj = new Estudiante('PEPE', 35);
    this.listaEstudiantes.push(new Estudiante('PEPE', 35));
    this.listaEstudiantes.push(new Estudiante('PEPE 1', 35));
    this.listaEstudiantes.push(new Estudiante('PEPE 2', 35));
    this.listaEstudiantes.push(new Estudiante('PEPE 3', 35));
    this.listaEstudiantes.push(new Estudiante('PEPE 4', 35));
    this.listaEstudiantes.push(new Estudiante('PEPE 5', 35));
  */
  }
  getSuma(numero1: number, numero2: number) {
    return numero1 + numero2;
  }
  cambiarTitulo() {
    this.title = this.texto;
  }
  onLogoutClick() {
    // Llama al método de cierre de sesión del servicio AuthService
    this.authService.logout();
    this.isLoggedIn = false; // Actualiza el estado de isLoggedIn
    // Navega a la página de inicio de sesión en lugar de recargar la página
    this.router.navigate(['/login']);
  }
}
