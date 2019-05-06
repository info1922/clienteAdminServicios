import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  canActivate: []
}, {
  path: 'registro',
  component: RegisterComponent,
  canActivate: []
}, {
  path: 'principal',
  loadChildren: '../app/principal/principal.module#PrincipalModule',
  canActivate: []
}, {
  path: '**',
  redirectTo: 'principal',
  canActivate: []
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
