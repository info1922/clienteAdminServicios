import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import { PerfilService } from '../perfil/perfil.service';
import { JwtService } from '../../core/services/jwt.service';
import { Usuario } from '../../core/models/usuario';
import { WebsocketService } from '../../core/services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  usuario: Usuario;
  token: any;

  constructor(
    public perfilservice: PerfilService,
    public jwtService: JwtService,
    public wsService: WebsocketService) {

  }

    getMessagesPrivate() {
        return this.wsService.escuchar('mensaje-privado');
    }
}
