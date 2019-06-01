import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './core/services/websocket.service';
import { MenuService } from './principal/menu/menu.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ListausuariosService } from './principal/listausuarios/listausuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

        usuariosActivosObsUser: Observable<any>;
        usuariosActivosObsAdmin: Observable<any>;
        usuariosActivosObsSuper: Observable<any>;
        usuariosActivosObsCliente: Observable<any>;

    constructor(
        public wsService: WebsocketService,
        public toas: ToastrService,
        public menu: MenuService,
        public lista: ListausuariosService) {

    }
    ngOnInit() {
        /* this.cargaUsuarios(); */
        this.mensajePrivado();

    }



    mensajePrivado() {
        this.menu.getMessagesPrivate().subscribe((msg: any) => {
            this.toas.info(`${msg.cuerpo}`, `${msg.de} te envio un mensaje` , {
                    positionClass: 'toast-top-right',
                    timeOut: 5000,
                    progressBar: true,
                    closeButton: true
                });
            console.log('Notificación ', msg);
        });
    }

     /* cargaUsuarios() {
        this.usuariosActivosObsUser = this.lista.getUsuariosActivosUser();
        this.usuariosActivosObsAdmin = this.lista.getUsuariosActivosAdmin();
        this.usuariosActivosObsSuper = this.lista.getUsuariosActivosSuper();
        this.usuariosActivosObsCliente = this.lista.getUsuariosActivosCliente();
    } */
}
