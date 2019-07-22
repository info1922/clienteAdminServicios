import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, LoginRsp, SignupRsp, Usuario, Registro } from '../models/usuario';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { WebsocketService } from './websocket.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token: any;
    usuario: any;
    expires: any;

    constructor(
        private httpClient: HttpClient,
        private jwtservice: JwtService,
        private router: Router,
        private wsService: WebsocketService
    ) {

        /* console.log('Esta en el auth'); */
        this.cargarStorage();
    }

    cargarStorage() {
        /* console.log('Storage: ', this.usuario); */
        if (this.jwtservice.getToken()) {
            this.token = this.jwtservice.getToken();
            this.usuario = JSON.parse(this.jwtservice.getUser());
            this.expires = this.jwtservice.getExpire();

            const data: any = {
                token: this.token,
                user: this.usuario
            };

            this.wsService.loginWs(data);

        } else  {
            // console.log('TOken: ', this.token);
            this.token = '';
            this.usuario = null;
           // window.location.href = 'http://localhost:4200/#/login';
        }
    }

    guardarStorage(token: string, usuario: any, expires: any) {
        this.jwtservice.setToken(token);
        this.jwtservice.setUser(usuario);
        this.jwtservice.setExpire(expires);

        this.usuario = usuario;
        this.token = token;
    }


    registro(body: Registro) {
        return this.httpClient.post(`${environment.api_url}/user/signup`, body).pipe(map((res: any) => {
        // Mensaje de alerta
        // console.log('Usuario creado');
        return res.usuario;
        }));
    }



    login(body: User): Observable<LoginRsp> {
        return this.httpClient.post<LoginRsp>(`${environment.api_url}/user/login`, body)
        .pipe(map((res: any) => {
            /* console.log('ExpiresToken: ', res.expires); */
            this.guardarStorage(res.token, res.user, res.expires);
            this.token = [res.token];
            return res;
        }));
    }

    isAuthenticated(token): Observable<boolean> {
        // console.log('El token: ', token);
        const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // tslint:disable-next-line:object-literal-key-quotes
            Authorization: `bearer ${token}`
        })
        };
        return this.httpClient.get<boolean>(`${environment.api_url}/auth/authenticate`, httpOptions).pipe(map((res: any) => {
            /* console.log('Respuesta: 1 ', res); */
            // this.guardarStorage(res.token, res.usuario, res.expires);
            // this.token = [res.token];
            this.jwtservice.setUser(res.usuario);
            this.cargarStorage();
            return res;
        }, err => {
            console.log('Ocurrio un error');
        }));
    }


    logout() {
        return this.httpClient.get(`${environment.api_url}/auth/logout`).pipe(map((res: any) => {
            return res;
        }));
    }

    resetlink(body) {
        return this.httpClient.post(`${environment.api_url}/user/forgotpassword`, body)
            .pipe(map((res: any) => {
                return res;
            }));
    }

    googleAuth() {
        /* console.log('Google'); */
        return this.httpClient.get(`${environment.api_url}/auth/google`).pipe(map((res: any) => {
            /* console.log('Respuesta servidor: 2 ', res); */
            return res;
        }));
    }


}
