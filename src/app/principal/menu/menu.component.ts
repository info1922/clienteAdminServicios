import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JwtService } from '../../core/services/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginComponent } from '../../auth/login/login.component';
import { MenuService } from './menu.service';
import { PerfilService } from '../perfil/perfil.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  mensaje: Subscription;
  constructor(
    public router: Router,
    public authService: AuthService,
    public perfilService: PerfilService
  ) {


    }

    ngOnInit() {

      /* this.mensaje = this.perfilService.escucharcambios().subscribe(msg => {
        this.us = msg;
        console.log(this.us.nombre);
      }); */
    }


  salir() {
    this.authService.logout();
  }




}
