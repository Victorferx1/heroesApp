import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, tap, } from 'rxjs';
import { inject } from '@angular/core';

const checkAuthStatus = (): boolean | Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
   
    return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('isAuthenticated', isAuthenticated)),
      tap( isAuthenticated  => {
        if (isAuthenticated) {
          router.navigate(['/']);
        }
      }),
      map( isAuthenticated => !isAuthenticated )
    );
  };

export const publicCanActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    return checkAuthStatus();
}

export const publicCanMatchGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
) => {
    return checkAuthStatus();
}