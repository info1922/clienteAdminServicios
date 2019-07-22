import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  setToken(token: string) {
    window.localStorage.setItem('jwt_token', token);
  }

  getToken() {
    return window.localStorage.getItem('jwt_token');
  }

  destroyToken() {
    window.localStorage.removeItem('jwt_token');
  }

  setUser(user: string) {
    window.localStorage.setItem('usuario',  JSON.stringify(user));
  }

  getUser() {
    return window.localStorage.getItem('usuario');
  }

  destroyUser() {
    window.localStorage.removeItem('usuario');
  }

  setExpire(expires: number) {
      window.localStorage.setItem('cad', JSON.stringify(expires));
  }

  getExpire() {
      return window.localStorage.getItem('cad');
  }

  destroyExpires() {
      window.localStorage.removeItem('cad');
  }

}
