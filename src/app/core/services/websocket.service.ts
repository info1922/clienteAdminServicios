import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(
    private  socket: Socket,
    public jwtService: JwtService  ) {
      this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }



/** Eventos enviados al servidor */
// tslint:disable-next-line:ban-types
emitir( evento: string, payload?: any, callback?: Function) {
  console.log('Emitiendo mensaje del cliente ↪ servidor');
  this.socket.emit(evento, payload, callback);
}
loginWs(data: any) {
  console.log('Configurando', data);
  this.emitir('configurar-usuario', {data}, (resp: any) => {
    console.log('Respuesta: ', resp);

  });
  /* this.socket.emit('configurar-usuario', {token}, (resp) => {
    // Respuesta del servidor
  }); */
}
/** **************************** */


/** Eventos recibidos por el cliente  desde el servidor */
  escuchar(evento: string) {
    console.log('Escuchar evento del servidor  ↪ cliente');
    return this.socket.fromEvent(evento);
  }
  escucharLogin(evento: string) {
    /* console.log('Escucha evento login'); */
    return this.socket.fromEvent(evento);
  }
/** *************************************************** */



}
