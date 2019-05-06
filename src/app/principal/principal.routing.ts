import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { PanelComponent } from './panel/panel.component';


const routes: Routes = [{
  path: '',
  component: PanelComponent,
  canActivate: [],
  children: [
    {
      path: '',
      component: ContainerComponent,
      canActivateChild: []
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
