import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { WebsocketService } from '../../core/services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class TodosnegociosService {

    negocios: any;
    constructor(
        public httpClient: HttpClient
        ) {
        }

    obtenerNegocios() {
        const url = `${environment.api_url}/nese`;
        return this.httpClient.get(url).pipe(map((resp: any) => {
            /* console.log('Negocios registrados: ', resp); */
            return resp.neseList;
        }));
    }



}
