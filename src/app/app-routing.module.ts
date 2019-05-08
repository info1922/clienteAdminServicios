import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { NoAuthGuardGuard } from './core/services/no-auth-guard.guard';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  canActivate: [NoAuthGuardGuard]
}, {
  path: 'registro',
  component: RegisterComponent,
  canActivate: [NoAuthGuardGuard]
}, {
  path: 'principal',
  loadChildren: '../app/principal/principal.module#PrincipalModule',
  canActivate: [AuthGuardService]
}, {
  path: '**',
  redirectTo: 'principal'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
