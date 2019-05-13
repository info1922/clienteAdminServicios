import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import { ChangeNombre, Usuario } from '../../core/models/usuario';
import { AuthService } from '../../core/services/auth.service';
import { JwtService } from '../../core/services/jwt.service';
import { WebsocketService } from '../../core/services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    public httpClient: HttpClient,
    public authService: AuthService,
    public wsService: WebsocketService) {

    }

    /* headers: HttpHeaders =  new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      Authorization: `bearer ${this.jwtService.getToken()}`
    }); */




  cambiarNombre(body: Usuario) {

    const url = `${environment.api_url}/user/update`;

    // Mandamos el evento
   /*  this.wsService.emitir('mandaUsertoUpdate', body); */

    return this.httpClient.put( url, body)
      .pipe(map( (resp: any) => {
        const token = this.authService.token;
        const data = {
          token: `${token}`,
          user: resp.usuario
        };
        console.log('Data a actualizar: ', data);
        this.wsService.loginWs(data);
        this.authService.guardarStorage(this.authService.token, resp.usuario);
        return true;
      }));
  }

  /** Recibir evento desde el servidor */
  escucharcambios() {
    return this.wsService.escuchar('updatename');
  }

}
