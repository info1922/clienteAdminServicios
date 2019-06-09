import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { NoAuthGuardGuard } from './core/services/no-auth-guard.guard';
import { PasswordComponent } from './auth/password/password.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  canActivate: [NoAuthGuardGuard]
}, {
  path: 'registro',
  component: RegisterComponent,
  canActivate: [NoAuthGuardGuard]
}, {
  path: 'reset',
  component: PasswordComponent,
  canActivate: [NoAuthGuardGuard]
}, {
  path: 'reset-password/:token/:email',
  component: ResetpasswordComponent,
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
