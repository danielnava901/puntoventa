import {CanActivateFn, Router} from '@angular/router';

export const LoginRedirectGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const auth = localStorage.getItem('auth');
  return auth ? router.navigate(['/dashboard']) : true;
};
