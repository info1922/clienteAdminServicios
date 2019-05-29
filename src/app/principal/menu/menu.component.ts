import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JwtService } from '../../core/services/jwt.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginComponent } from '../../auth/login/login.component';
import { MenuService } from './menu.service';
import { PerfilService } from '../perfil/perfil.service';
import { Subscription } from 'rxjs';
import { ListausuariosService } from '../listausuarios/listausuarios.service';
import { ToastrService } from 'ngx-toastr';


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
    public perfilService: PerfilService,
    public lista: ListausuariosService,
    public menu: MenuService,
    public toas: ToastrService
  ) {


    }

    ngOnInit() {
        this.menu.getMessagesPrivate().subscribe((msg: any) => {
            this.toas.info(`${msg.cuerpo}`, `${msg.de} te envio un mensaje` , {
                    positionClass: 'toast-top-right',
                    timeOut: 5000,
                    progressBar: true,
                    closeButton: true
                });
        });
    }


    salir() {
        this.authService.logout();
    }


    obtener() {
        this.lista.obtenerconectados().subscribe( res => {
            console.log('Respuesta: ', res);
        });
    }

}
