import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { WebsocketService } from '../../core/services/websocket.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListausuariosService {

    constructor(
        public wsService: WebsocketService,
        public httpClient: HttpClient) { }

    obtenerconectados() {
        const url = `${environment.api_url}/user/conectados`;
        return this.httpClient.get(url).pipe(map((resp: any) => {
            return resp;
        }));
    }

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

    getMessages() {
        return this.wsService.escuchar('mensaje-nuevo');
    }


    enviarprivado(id: string, mensaje: any) {
        const url = `${environment.api_url}/user/sendmessage/${id}`;
        const body = {
            mensaje
        };
        return this.httpClient.post(url, body).pipe(map((res: any) => {
            return res;
        }));
    }


}
