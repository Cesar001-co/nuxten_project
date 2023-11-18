import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SlideMenuComponent } from './components/shared/slide-menu/slide-menu.component';
import { HomeComponent } from './pages/home/home.component';
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
import { CambiarPasswComponent } from './components/dialog-alerts/cambiar-passw/cambiar-passw.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptorInterceptor } from './components/auth/interceptor/jwt-interceptor.interceptor';
import { CrearEvaluacionComponent } from './components/gestionar-evaluaciones/crear-evaluacion/crear-evaluacion.component';
import { ConsultarEvaluacionComponent } from './components/gestionar-evaluaciones/consultar-evaluacion/consultar-evaluacion.component';
import { CreadaComponent } from './components/fases-evaluacion/creada/creada.component';
import { Fase1Component } from './components/fases-evaluacion/fase1/fase1.component';
import { Fase2Component } from './components/fases-evaluacion/fase2/fase2.component';
import { Fase3Component } from './components/fases-evaluacion/fase3/fase3.component';
import { Fase4Component } from './components/fases-evaluacion/fase4/fase4.component';

import { BreadcrumbModule } from 'angular-crumbs';
import { WaitingComponent } from './components/dialog-alerts/waiting/waiting.component';
import { AgregarProblemaComponent } from './components/fases-evaluacion/agregar-problema/agregar-problema.component';
import { PrincipiosComponent } from './components/dialog-alerts/principios/principios.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SlideMenuComponent,
    HomeComponent,
    InicioComponent,
    EvaluacionComponent,
    ListaEvaluacionesComponent,
    GestionarExpertosComponent,
    GestionarEvaluacionesComponent,
    UserComponent,
    BodyComponent,
    AgregarExpertoComponent,
    ModificarExpertoComponent,
    AdvertenciaComponent,
    CambiarPasswComponent,
    CrearEvaluacionComponent,
    ConsultarEvaluacionComponent,
    CreadaComponent,
    Fase1Component,
    Fase2Component,
    Fase3Component,
    Fase4Component,
    WaitingComponent,
    AgregarProblemaComponent,
    PrincipiosComponent,
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
    MatCheckboxModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatSelectModule,
    BreadcrumbModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgApexchartsModule
  ],
  providers: [
    CookieService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true
    } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
