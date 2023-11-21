import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap, } from 'rxjs';
import { inject } from '@angular/core';

const checkAuthStatus = (): boolean | Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
   
    return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('isAuthenticated', isAuthenticated)),
      tap( isAuthenticated  => {
        if (!isAuthenticated) {
          router.navigate(['/auth/login']);
        }
      })
    );
  };

export const canActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    // console.log('CanActivate');
    // console.log(route, state);

    return checkAuthStatus();
}

export const canMatchGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
) => {
    // console.log('CanMatch');
    // console.log(route, segments);

    return checkAuthStatus();
}