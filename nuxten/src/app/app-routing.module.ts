import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EvaluacionComponent } from './pages/evaluacion/evaluacion.component';
import { ListaEvaluacionesComponent } from './pages/lista-evaluaciones/lista-evaluaciones.component';
import { GestionarExpertosComponent } from './pages/gestionar-expertos/gestionar-expertos.component';
import { GestionarEvaluacionesComponent } from './pages/gestionar-evaluaciones/gestionar-evaluaciones.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'Inicio-de-sesion', pathMatch: 'full' },
  { path: 'Inicio-de-sesion', component: LoginComponent },
  {
    path: 'nuxten', component: HomeComponent, 
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'evaluación', component: EvaluacionComponent },
      { path: 'lista-de-evaluaciones', component: ListaEvaluacionesComponent },
      { path: 'gestionar-expertos', component: GestionarExpertosComponent },
      { path: 'gestionar-evaluaciones', component: GestionarEvaluacionesComponent },
      { path: 'user/:id', component: UserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
