import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../../services/userAuthService';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(UserAuthService);
  let router = inject(Router);

  if (!authService.getToken()) {
    router.navigateByUrl('/login');
    return false;
  } else {
    return true;
  }
};
