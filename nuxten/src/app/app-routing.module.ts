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
import { UserGuardGuard } from './components/auth/guard/user-guard.guard';
import { RolGuardGuard } from './components/auth/guard/rol-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'NUXTEN_PROJECT/Inicio-de-sesion', pathMatch: 'full' },
  { path: 'NUXTEN_PROJECT', redirectTo: 'NUXTEN_PROJECT/inicio', pathMatch: 'full' },
  { path: 'NUXTEN_PROJECT/Inicio-de-sesion', component: LoginComponent },
  {
    path: 'NUXTEN_PROJECT', component: HomeComponent, 
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'evaluación', component: EvaluacionComponent },
      { path: 'lista-de-evaluaciones', component: ListaEvaluacionesComponent },
      { path: 'gestionar-expertos', component: GestionarExpertosComponent, canActivate: [RolGuardGuard] },
      { path: 'gestionar-evaluaciones', component: GestionarEvaluacionesComponent, canActivate: [RolGuardGuard] },
      { path: 'user', component: UserComponent }
    ], canActivate: [UserGuardGuard]
  },
  { path: '**', redirectTo: 'NUXTEN_PROJECT/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
