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
      const token = route.queryParamMap.get('token');

      // tslint:disable-next-line:no-debugger
      // debugger;
      if (token) {

        return this.authService.isAuthenticated(token).pipe(
          map((authenticated: any) => {

            if (authenticated.bandera === true) {
              this.jwtService.setToken(token);
              this.jwtService.setUser(authenticated.usuario);
              this.router.navigate(['/principal']);
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
