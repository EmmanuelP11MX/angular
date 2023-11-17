import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './componente/home/home.component';
import { SolicitudesComponent } from './componente/solicitudes/solicitudes.component';
import { CrearSolicitudesComponent } from './componente/crear-solicitudes/crear-solicitudes.component';
import { ListaSolicitudesComponent } from './componente/lista-solicitudes/lista-solicitudes.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { CambioPasswordComponent } from './componente/cambio-password/cambio-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SolicitudesComponent,
    CrearSolicitudesComponent,
    ListaSolicitudesComponent,
    LoginComponent,
    CambioPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
