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
        // console.log(this.jwtService.getToken());
      /*   console.log('Paso el guard');
        console.log('Token: ', route.queryParams); */
        return of(true);
      }
      const token = route.queryParamMap.get('token');
      // tslint:disable-next-line:no-debugger
      // debugger;
      if (token) {
        /* console.log('El token: ', token); */
        return this.authService.isAuthenticated(token).pipe(
          map((authenticated) => {
            console.log(authenticated);
            if (authenticated === true) {
              this.jwtService.setToken(token);
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
