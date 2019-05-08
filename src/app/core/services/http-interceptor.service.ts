import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(public jwtService: JwtService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {


      const headerConfig = {
        'Content-Type' : 'application/json',
        // tslint:disable-next-line:object-literal-key-quotes
        'Accept' : 'application/json'
      };
      // tslint:disable-next-line:no-debugger

      const token = this.jwtService.getToken();
      // tslint:disable-next-line:no-debugger

      if (token) {
        // tslint:disable-next-line:no-string-literal
        headerConfig['Authorization'] = `bearer ${token}`;
      }

      const Req = req.clone({setHeaders: headerConfig});
      return next.handle(Req);
    }

}
