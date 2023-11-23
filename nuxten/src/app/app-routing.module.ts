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
import { CreadaComponent } from './components/fases-evaluacion/creada/creada.component';
import { Fase1Component } from './components/fases-evaluacion/fase1/fase1.component';
import { Fase2Component } from './components/fases-evaluacion/fase2/fase2.component';
import { Fase3Component } from './components/fases-evaluacion/fase3/fase3.component';
import { Fase4Component } from './components/fases-evaluacion/fase4/fase4.component';
import { UserDataResolver } from './resolvers/user_data.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'NUXTEN_PROJECT/Inicio-de-sesion', pathMatch: 'full' },
  { path: 'NUXTEN_PROJECT', redirectTo: 'NUXTEN_PROJECT/inicio', pathMatch: 'full' },
  { path: 'NUXTEN_PROJECT/Inicio-de-sesion', component: LoginComponent },
  {

    path: 'NUXTEN_PROJECT', component: HomeComponent, resolve: {
      userData: UserDataResolver
    },
    children: [
      {
        path: 'inicio', component: InicioComponent
      },
      {
        path: 'evaluacion', component: EvaluacionComponent,
        children: [
          { path: 'Datos-evaluacion/:faseEva/:evaluacion/:pos', component: CreadaComponent, data: { breadcrumb: 'Datos de la evaluación' } },
          { path: 'Fase-1/:faseEva/:evaluacion/:pos', component: Fase1Component, data: { breadcrumb: 'Fase 1' } },
          { path: 'Fase-2/:faseEva/:evaluacion/:pos', component: Fase2Component, data: { breadcrumb: 'Fase 2' } },
          { path: 'Fase-3/:faseEva/:evaluacion/:pos', component: Fase3Component, data: { breadcrumb: 'Fase 3' } },
          { path: 'Fase-4/:faseEva/:evaluacion/:pos', component: Fase4Component, data: { breadcrumb: 'Fase 4' } }
        ], data: { breadcrumb: 'Evaluación' }
      },
      { path: 'lista-de-evaluaciones', component: ListaEvaluacionesComponent, data: { breadcrumb: 'Lista de Evaluaciones' } },
      { path: 'gestionar-expertos', component: GestionarExpertosComponent, canActivate: [RolGuardGuard], data: { breadcrumb: 'Gestionar Expertos' } },
      { path: 'gestionar-evaluaciones', component: GestionarEvaluacionesComponent, canActivate: [RolGuardGuard], data: { breadcrumb: 'Gestionar Evaluaciones' } },
      { path: 'user', component: UserComponent, data: { breadcrumb: 'Experto' } }
    ], canActivate: [UserGuardGuard], data: { breadcrumb: 'Inicio' }
  },
  { path: '**', redirectTo: 'NUXTEN_PROJECT/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
