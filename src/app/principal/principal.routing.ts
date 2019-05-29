import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { PanelComponent } from './panel/panel.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuardService } from '../core/services/auth-guard.service';
import { ListausuariosComponent } from './listausuarios/listausuarios.component';


const routes: Routes = [{
  path: '',
  component: PanelComponent,
  canActivate: [AuthGuardService],
  children: [
    {
      path: '',
      component: ContainerComponent,
      canActivateChild: [AuthGuardService]
    },
    {
      path: 'perfil',
      component: PerfilComponent,
      canActivateChild: [AuthGuardService]
    },
    {
        path: 'listausuarios',
        component: ListausuariosComponent,
        canActivateChild: [AuthGuardService]
    }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class PrincipalRoutingModule { }
