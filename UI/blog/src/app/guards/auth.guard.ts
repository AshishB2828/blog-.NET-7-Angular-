import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

import { CookieService } from "ngx-cookie-service";
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();

  //check for the JWT token

  let token =  cookieService.get("Authorization");

  if(token && user) {

    token = token.replace('Bearer ', '');
    const decodedToken:any = jwtDecode(token);
    console.log(token);
    console.log(decodedToken);

    //expired or not
    const expDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();
    if(expDate < currentTime)
    {
        authService.logout();
        return router.createUrlTree(['/login'], {queryParams: {  returnUrl: state.url}});
    }else{
        if(user.roles.includes('Writer')) return true;
        else{
          alert('Unauth');
          router.navigate(["/"])
          return false;

        }
    }
  }
  else
  {
    authService.logout();
    return router.createUrlTree(['/login'], {queryParams: {  returnUrl: state.url}});
  }

};
