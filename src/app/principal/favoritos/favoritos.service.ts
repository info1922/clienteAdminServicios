import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../../core/services/websocket.service';

@Injectable({
    providedIn: 'root'
})
export class FavoritosService {

    constructor(
        public httpClient: HttpClient,
        public wsService: WebsocketService) { }

    getAllFavoritos() {
        const url = `${environment.api_url}/user/favoritos`;

        return this.httpClient.get(url).pipe(map((resp: any) => {
            return resp;

        }));
    }

    escucharFavoritos() {
        return this.wsService.escuchar('favoritos-privado');
    }



}
