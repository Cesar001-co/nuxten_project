import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SlideMenuComponent } from './components/shared/slide-menu/slide-menu.component';
// import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { UserBarComponent } from './components/shared/user-bar/user-bar.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EvaluacionComponent } from './pages/evaluacion/evaluacion.component';
import { ListaEvaluacionesComponent } from './pages/lista-evaluaciones/lista-evaluaciones.component';
import { GestionarExpertosComponent } from './pages/gestionar-expertos/gestionar-expertos.component';
import { GestionarEvaluacionesComponent } from './pages/gestionar-evaluaciones/gestionar-evaluaciones.component';
import { UserComponent } from './pages/user/user.component';
import { BodyComponent } from './pages/body/body.component';
import { AgregarExpertoComponent } from './components/gestionar-expertos/agregar-experto/agregar-experto.component';
import { ModificarExpertoComponent } from './components/gestionar-expertos/modificar-experto/modificar-experto.component';
import { AdvertenciaComponent } from './components/dialog-alerts/advertencia/advertencia.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SlideMenuComponent,
    HomeComponent,
    UserBarComponent,
    InicioComponent,
    EvaluacionComponent,
    ListaEvaluacionesComponent,
    GestionarExpertosComponent,
    GestionarEvaluacionesComponent,
    UserComponent,
    BodyComponent,
    AgregarExpertoComponent,
    ModificarExpertoComponent,
    AdvertenciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
