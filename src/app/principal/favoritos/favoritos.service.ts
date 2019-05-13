import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FavoritosService {

    constructor(public httpClient: HttpClient) { }

    getAllFavoritos() {
        const url = `${environment.api_url}/user/favoritos`;

        return this.httpClient.get(url).pipe(map((resp: any) => {
            return resp;

        }));
    }



}
