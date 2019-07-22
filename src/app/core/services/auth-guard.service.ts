import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { AuthService } from './auth.service';
import { CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(
        public jwtService: JwtService,
        public router: Router,
        public authService: AuthService
    ) {
        /* console.log('En el guard'); */
    }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> {
        if (this.jwtService.getToken()) {
            return of(true);
        }
        /* console.log(route.queryParamMap); */
        const conjunto = route.queryParamMap.get('token');
        const cortado = conjunto.split('expires');
        const token = cortado[0];
        const expires = cortado[1];
        /* console.log('Token: ', token);
        console.log('Expires:', expires); */

        // tslint:disable-next-line:no-debugger

        if (token) {
            /* console.log('Tiene un token: ', token); */
            // console.log('Expires: ', expires);
            this.jwtService.setToken(token);
            this.jwtService.setExpire(parseInt(expires, 10));

            return this.authService.isAuthenticated(token).pipe(
            map((authenticated: any) => {
                /* console.log(authenticated); */
                if (authenticated) {
                this.jwtService.setToken(token);
                this.jwtService.setUser(authenticated.usuario);
                /* console.log('Autenticado ...'); */
                this.router.navigate(['principal']);
                return true;
                }
                this.router.navigate(['/login']);
                return false;
            }),
            catchError((err: any) => {
                this.router.navigate(['/login']);
                return of(false);
            })
            );
        } else {
            /* console.log('No tiene Token'); */
            this.router.navigate(['/login']);
            return of(true);
        }

    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<boolean> {
        return this.canActivate(route, state);
    }
}
