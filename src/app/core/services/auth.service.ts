import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, LoginRsp, SignupRsp, Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { error } from 'util';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private jwtservice: JwtService,
    private router: Router) {

    /* console.log('Esta en el auth'); */
  }

  token: any;
  usuario: any;
  isLogin: any = false;
  registro(body: Usuario): Observable<SignupRsp> {
    return this.httpClient.post<SignupRsp>(`${environment.api_url}/user/signup`, body);
  }

  login(body: User): Observable<LoginRsp> {
    return this.httpClient.post<LoginRsp>(`${environment.api_url}/user/login`, body)
    .pipe(map((res: any) => {
     /*  console.log('Respuesta: ', res); */
      this.token = [res.token];
      this.isLogin = true;
      return res;
    }));
  }

  isAuthenticated(token): Observable<boolean> {
    console.log('El token: ', token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        Authorization: `bearer ${token}`
      })
    };
    return this.httpClient.get<boolean>(`${environment.api_url}/user/login`, httpOptions);
  }

  issLogin() {
    return this.isLogin;
  }

  setUser(user) {
    const usr = JSON.stringify(user);
    localStorage.setItem('usuario', usr);
  }

  getUser() {
    return localStorage.getItem('usuario');
  }

  /* getUsuarioActual() {
    const usrstring = localStorage.getItem('usuario');
    if (!isNullOrUndefined(usrstring)) {
      const user = JSON.parse(usrstring);
      return user;
    } else {
      return null;
    }
  } */

  logout() {
    this.jwtservice.destroyToken();
    localStorage.removeItem('usuario');
    this.router.navigate(['login']);
  }


}
