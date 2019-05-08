import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrincipalRoutingModule } from './principal.routing';
import { PanelComponent } from './panel/panel.component';
import { ContainerComponent } from './container/container.component';
import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MenuService } from './menu/menu.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../core/services/http-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrincipalRoutingModule
  ],
  exports: [],
  declarations: [PanelComponent, ContainerComponent, MenuComponent, PerfilComponent],
  providers: [MenuService]
})
export class PrincipalModule { }
