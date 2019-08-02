import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { WebsocketService } from '../../core/services/websocket.service';
import { JwtService } from '../../core/services/jwt.service';
import { AuthService } from '../../core/services/auth.service';
import { FavoritosService } from '../favoritos/favoritos.service';

@Injectable({
  providedIn: 'root'
})
export class TodosnegociosService {

    negocios: any;
    usuario = JSON.parse(this.jwtService.getUser());
    constructor(
        public httpClient: HttpClient,
        public jwtService: JwtService,
        public authService: AuthService,
        public favService: FavoritosService,
        public wsService: WebsocketService
        ) {
        }

    obtenerNegocios() {
        const url = `${environment.api_url}/nese`;
        return this.httpClient.get(url).pipe(map((resp: any) => {
            return resp.neseList;
        }));
    }

    eliminarNegocio(body: any) {
        const url = `${environment.api_url}/nese/${body._id}/${this.usuario._id}`;

        return this.httpClient.delete(url).pipe(map((resp: any) => {
            /* console.log('Negocio eliminado: ', resp); */
            this.jwtService.setUser(resp.acusuario);
            // this.favService.escucharFavoritos();
        }));
    }

    agregarFavorito(id: any) {

        const url = `${environment.api_url}/user/favoritosu`;
        const body: any = {
            id
        };
        return this.httpClient.put(url, body).pipe(map((resp: any) => {

            const token = this.authService.token;
            const expires = parseInt(this.jwtService.getExpire(), 10);
            this.authService.guardarStorage(token, resp.usuario, expires);
            return resp;
        }));
    }

    like(id: any) {
        const url = `${environment.api_url}/user/like`;

        const body: any = {
            id
        };

        return this.httpClient.post(url, body).pipe(map((resp: any) => {
            const token = this.authService.token;
            const expires = parseInt(this.jwtService.getExpire(), 10);
            this.authService.guardarStorage(token, resp.usuario, expires);
            return resp;
        }));
    }

    dislike(id: any) {
        const url = `${environment.api_url}/user/dislike`;

        const body: any = {
            id
        };

        return this.httpClient.post(url, body).pipe(map((resp: any) => {
            const token = this.authService.token;
            const expires = parseInt(this.jwtService.getExpire(), 10);
            this.authService.guardarStorage(token, resp.usuario, expires);
            return resp;
        }));
    }


}
