import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let session = ''; 
  inject(AuthService).getSession().subscribe({
    next: jwt => session = jwt
  });
  if (session) return true; else return false;
};
