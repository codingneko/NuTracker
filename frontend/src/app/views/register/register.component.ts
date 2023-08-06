import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterRequest } from 'src/app/models/request/RegisterRequest.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    constructor(
        private authService: AuthService, 
        private router: Router, 
        private messageService: MessageService) {}

    registerRequest: RegisterRequest = {
        password: '',
        username: '',
    };

    onRegister() {
        this.authService.register(this.registerRequest).subscribe({
            next: response => {
                this.router.navigateByUrl('login');
                this.messageService.add({
                    key: 'br',
                    severity: 'success',
                    summary: 'Thanks for registering!',
                    detail: 'Please log in with your new username and password'
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

                if (response.status == 409 && typeof response.message === 'string') {
                    console.log(response);
                    this.messageService.add({
                        key: 'br',
                        severity: 'error',
                        summary: 'User already exists',
                        sticky: true,
                        detail: response.error.message
                    });
                }
                
            }
        });
    }
}
