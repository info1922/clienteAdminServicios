import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JwtService } from '../../core/services/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginComponent } from '../../auth/login/login.component';
import { MenuService } from './menu.service';
import { PerfilService } from '../perfil/perfil.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  constructor(
    public jwtService: JwtService,
    public router: Router,
    public authService: AuthService,
    public menuService: MenuService,
    public login: LoginComponent,
    public perfilService: PerfilService) {
    }

    ngOnInit() {
    }

  salir() {
    this.authService.logout();
  }




}
