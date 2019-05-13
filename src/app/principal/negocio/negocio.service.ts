import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Negocio } from '../../core/models/negocio';
import { JwtService } from '../../core/services/jwt.service';
import { WebsocketService } from '../../core/services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
    negocios: any;
    constructor(
        public httpCliente: HttpClient,
        public jwtService: JwtService,
        public wsService: WebsocketService
        ) { }

    headers: HttpHeaders =  new HttpHeaders({
      'Content-Type': 'application/json',
      // tslint:disable-next-line:object-literal-key-quotes
      Authorization: `bearer ${this.jwtService.getToken()}`
    });
    nuevoNegocio(body: Negocio) {
        const url = `${environment.api_url}/nese`;

        return this.httpCliente.post(url, body).pipe(map((resp: any) => {
            return true;
        }));
    }

    /* escucharSocket() {
        this.wsService.escuchar('negocios')
        .subscribe((data: any) => {
            this.negocios = data;
            console.log('Nueva data: ', data);
        });
    } */
}
