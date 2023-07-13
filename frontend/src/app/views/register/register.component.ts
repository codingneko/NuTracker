import { Component } from '@angular/core';
import { RegisterRequest } from 'src/app/models/request/RegisterRequest.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    constructor(private authService: AuthService) {}
    registerRequest: RegisterRequest = {
        password: '',
        username: '',
    };

    onRegister() {
        this.authService.register(this.registerRequest).subscribe((result) => {
            console.log(result);
        });
    }
}
