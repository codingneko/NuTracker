import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
    let session = '';
    session = inject(CookieService).get('JSESSIONID');
    if (session) return true;
    else return false;
};
