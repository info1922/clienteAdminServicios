import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../../core/services/websocket.service';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class FavoritosService {

    constructor(
        public httpClient: HttpClient,
        public wsService: WebsocketService,
        public authService: AuthService) { }

    getAllFavoritos() {
        const url = `${environment.api_url}/user/favoritos`;

        return this.httpClient.get(url).pipe(map((resp: any) => {
            return resp;

        }));
    }

    escucharFavoritos() {
        return this.wsService.escuchar('favoritos-privado');
    }

    quitarFavorito(id: string) {
        const url = `${environment.api_url}/user/favdelete/${id}`;
        return this.httpClient.delete(url).pipe(map((resp: any) => {
           /*  console.log('respuesta: ', resp); */
            const token = this.authService.token;
            this.authService.guardarStorage(token, resp.user);
            return resp;
        }));
    }



}
