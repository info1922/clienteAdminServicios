import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { WebsocketService } from '../../core/services/websocket.service';
import { JwtService } from '../../core/services/jwt.service';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodosnegociosService {

    negocios: any;
    constructor(
        public httpClient: HttpClient,
        public jwtService: JwtService,
        public authService: AuthService
        ) {
        }

    obtenerNegocios() {
        const url = `${environment.api_url}/nese`;
        return this.httpClient.get(url).pipe(map((resp: any) => {
            /* console.log('Negocios registrados: ', resp); */
            return resp.neseList;
        }));
    }

    eliminarNegocio(body: any) {
        const url = `${environment.api_url}/nese/${body._id}/${body.admin._id}`;

        return this.httpClient.delete(url).pipe(map((resp: any) => {
            /* console.log('Negocio eliminado: ', resp); */
        }));
    }

    agregarFavorito(id: any) {
        /* console.log('Id del negocio a enviar', id); */
        const url = `${environment.api_url}/user/favoritosu`;
        const body: any = {
            id
        };
        return this.httpClient.put(url, body).pipe(map((resp: any) => {
            // console.log('Negocio agregado a favoritos: ', resp);
            const token = this.authService.token;
            this.authService.guardarStorage(token, resp.usuario);
            return resp;
        }));
    }



}
