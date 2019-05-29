import { Injectable } from '@angular/core';
import { WebsocketService } from '../../core/services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ListausuariosService {

    constructor(public wsService: WebsocketService) { }


    getUsuariosActivosUser() {
        return this.wsService.escuchar('usuarios-activos-user');
    }

    getUsuariosActivosAdmin() {
        return this.wsService.escuchar('usuarios-activos-admin');
    }

    getUsuariosActivosSuper() {
        return this.wsService.escuchar('usuarios-activos-super');
    }

    getUsuariosActivosCliente() {
        return this.wsService.escuchar('usuarios-activos-c');
    }


}
