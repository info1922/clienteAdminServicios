import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import { ChangeNombre, Usuario } from '../../core/models/usuario';
import { AuthService } from '../../core/services/auth.service';
import { JwtService } from '../../core/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  usuario: Usuario;
  token: string;
  constructor(
    public httpClient: HttpClient,
    public authService: AuthService,
    public jwtService: JwtService) {
      this.cargarStorage();
      /* console.log('Usuario_perfilservice ', this.usuario); */
    }

    headers: HttpHeaders =  new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      Authorization: `bearer ${this.jwtService.getToken()}`
    });

  cambiarNombre(body: Usuario) {
    // console.log(this.jwtService.getToken());
    const url = `${environment.api_url}/user/update`;
    /* console.log('Cuerpo', body); */
    return this.httpClient.put( url, body);
  }

  cargarStorage() {
    if (this.jwtService.getToken()) {
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
       /* console.log('Usuario: ', this.usuario); */
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario.nombre = usuario.nombre;
    // console.log(this.usuario.nombre);
  }

}
