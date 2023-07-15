import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { LoginRequest } from 'src/app/models/request/LoginRequest.interface';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    userAccessToken: string = '';
    keepLoggedIn: boolean = true;
    loginRequest: LoginRequest = {
        password: '',
        username: '',
    };

    constructor(
        private authService: AuthService, 
        private messageService: MessageService, 
        private cookieService: CookieService,
        private router: Router) {}

    onLogin() {
        this.authService.login(this.loginRequest).subscribe({
            next: (loginResponse) => {
                let jwtInfo: any = jwt_decode(loginResponse.accessToken);

                if (this.keepLoggedIn) {
                    this.cookieService.set("JSESSIONID", loginResponse.accessToken, 31*3);
                } else {
                    this.cookieService.set("JSESSIONID", loginResponse.accessToken);
                }

                this.authService.setSession(this.cookieService.get('JSESSIONID'));

                this.router.navigateByUrl('/');

                this.messageService.add({
                    key: 'br',
                    severity: 'success',
                    summary: 'Logged in!',
                    sticky: true,
                    detail: 'Welcome ' + jwtInfo.username
                });
            },
            error: response => {
                if (response.status == 400 && Array.isArray(response.error.message)) {
                    let message: string = '';

                    response.error.message.forEach((element: string) => {
                        message += element.charAt(0).toUpperCase() + element.slice(1);
                        message += '. ';
                    });

                    this.messageService.add({
                        key: 'br',
                        severity: 'error',
                        summary: 'Wrong input',
                        sticky: true,
                        detail: message
                    });
                }

                if (response.status == 401) {
                    this.messageService.add({
                        key: 'br',
                        severity: 'error',
                        summary: 'Wrong credentials',
                        sticky: true,
                        detail: 'Please check your username and password.'
                    });
                }
            }
        });
    }
}
