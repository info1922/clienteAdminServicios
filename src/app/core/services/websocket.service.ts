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
    /*   this.cargarUsuarioLocal(); */
      this.checkStatus();
      /* this.usuario = this.jwtService.getUser(); */
  }

  checkStatus() {
    const token = this.jwtService.getToken();
    const user = JSON.parse(this.jwtService.getUser());
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      /* this.loginWs({token, user}); */
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.jwtService.destroyToken();
      this.jwtService.destroyUser();
      this.route.navigate(['login']);
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
  /* console.log('Configurando', data); */

  return new Promise((resol, reject) =>  {
    this.emitir('configurar-usuario', {data}, (resp: any) => {
      console.log('La data ', data);
      /* his.usuario = new User(data.user.nombre); */
     /*  this.guardarUsuarioLocal(); */
      resol();
    });
  });


}

logoutWs() {
  // this.usuario = null;
  // this.jwtService.destroyUser();
  const data = {
    user:  {
      nombre: 'sin-nombre'
    },
    token: 'sin-token'
  };

  const payload = {
    data,
    token: data.token
  };
 /*  console.log('Payload: ', payload); */
  this.emitir('configurar-usuario', payload, () => {});
}

/* guardarUsuarioLocal() {
  localStorage.setItem('usuario', JSON.stringify(this.usuario));
}

cargarUsuarioLocal() {
  if (localStorage.getItem('usuario')) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }
} */
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
