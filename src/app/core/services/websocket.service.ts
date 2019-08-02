import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';



@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    public socketStatus = false;

    usuario = null;
    constructor(
        private  socket: Socket,
        public jwtService: JwtService,
        public route: Router ) {

            this.checkStatus();

    }

    checkStatus() {
        const token = this.jwtService.getToken();
        const user = JSON.parse(this.jwtService.getUser());
        this.socket.on('connect', () => {
            console.log('conectado al servidor');
            this.socketStatus = true;
        });

        this.socket.on('disconnect', () => {
            console.log('Desconectado del servidor');
            this.socketStatus = false;
            /* this.jwtService.destroyToken();
            this.jwtService.destroyUser();
            this.route.navigate(['login']); */
            // window.location.reload();
            setTimeout(() => {
                this.jwtService.destroyExpires();
                this.jwtService.destroyToken();
                this.jwtService.destroyUser();
                alert('Servidor fuera de linea');
                this.route.navigate(['login']);
            }, 7000);
        });

    }



    /** Eventos enviados al servidor */
    // tslint:disable-next-line:ban-types
    emitir( evento: string, payload?: any, callback?: Function) {
        console.log('Emitiendo mensaje del cliente ↪ servidor');
        this.socket.emit(evento, payload, callback);
    }

    loginWs(data: any) {
        return new Promise((resol, reject) =>  {
            this.emitir('configurar-usuario', {data}, (resp: any) => {
                resol();
            });
        });
    }

    logoutWs() {
        const data = {
            user:  {
                nombre: 'sin-nombre',
                role: 'sin-role',
                _id: 'sin-id'
            },
            token: 'sin-token',
        };

        const payload = {
            data,
            token: data.token,
            role: data.user.role,
            _id: data.user._id
        };
        this.emitir('configurar-usuario', payload, () => {});
    }

/** Eventos recibidos por el cliente  desde el servidor */
    escuchar(evento: string) {
        console.log('evento: ', evento);
        return this.socket.fromEvent(evento);
    }

    escucharLogin(evento: string) {
        return this.socket.fromEvent(evento);
    }

}
