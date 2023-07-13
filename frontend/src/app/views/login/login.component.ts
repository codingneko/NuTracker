import { Component } from '@angular/core';
import { LoginRequest } from 'src/app/models/request/LoginRequest.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    userAccessToken: string = '';
    loginRequest: LoginRequest = {
        password: '',
        username: '',
    };

    constructor(private authService: AuthService) {}

    onLogin() {
        this.authService.login(this.loginRequest).subscribe({
            next: (loginResponse) => {
                this.userAccessToken = loginResponse.accessToken;
            },
        });
    }
}
