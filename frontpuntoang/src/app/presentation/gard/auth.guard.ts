import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const router = new Router();
  const isAuthenticated = !!localStorage.getItem('auth'); // tu lógica real aquí

  return isAuthenticated ? true : await router.navigate(['/login']);

};
