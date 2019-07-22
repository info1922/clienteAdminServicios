import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(public jwtService: JwtService, public route: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {


        const headerConfig = {
            'Content-Type' : 'application/json',
            // tslint:disable-next-line:object-literal-key-quotes
            'Accept' : 'application/json'
        };
        /* console.log('Interceptor'); */
        const token = this.jwtService.getToken();
        /* console.log(this.jwtService.getExpire()); */
        const expires = JSON.parse(this.jwtService.getExpire()) ;
        const ahora = Date.now();

        if (token) {
            if ( expires > ahora) {
                // tslint:disable-next-line:no-string-literal
                headerConfig['Authorization'] = `bearer ${token}`;
            } else {
                    /* console.log('Expira: ', expires);
                    console.log('Ahora: ', ahora); */
                    // Renueva token aqui
                   /*  console.log('El token a expirado '); */
                    this.jwtService.destroyExpires();
                    this.jwtService.destroyToken();
                    this.jwtService.destroyUser();
                    this.route.navigate(['login']);
            }
        }

        const Req = req.clone({setHeaders: headerConfig});
        /* console.log(Req); */
        return next.handle(Req);
    }

}
