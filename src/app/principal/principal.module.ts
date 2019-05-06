import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRoutingModule } from './principal.routing';
import { PanelComponent } from './panel/panel.component';
import { ContainerComponent } from './container/container.component';

@NgModule({
  imports: [
    CommonModule,
    PrincipalRoutingModule
  ],
  exports: [],
  declarations: [PanelComponent, ContainerComponent],
})
export class PrincipalModule { }
