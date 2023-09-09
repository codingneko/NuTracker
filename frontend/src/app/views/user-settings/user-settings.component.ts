import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    FileUploadEvent,
    FileUploadHandlerEvent,
    FileUploadModule,
    UploadEvent,
} from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import jwtDecode from 'jwt-decode';
import { Constants } from 'src/app/utils/Constants';
import User from 'src/app/models/entity/user.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
    currentUser: User = new User();
    jwt: string = this.cookieService.get('JSESSIONID');
    avatarUploadEndpoint = '';

    accountDeletionForm: FormGroup = this.formBuilder.group({
        accountDeletionCheckbox: ['', Validators.required],
    });

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private cookieService: CookieService
    ) {}

    ngOnInit(): void {
        this.userService.getUser().subscribe({
            next: (data) => {
                this.currentUser = data;
                this.avatarUploadEndpoint =
                    Constants.base_user_url +
                    '/' +
                    this.currentUser.id +
                    '/avatar';
            },
            error: (error) => {
                this.messageService.add({
                    key: 'br',
                    severity: 'error',
                    summary: 'Something went wrong',
                    detail: 'Something went wrong getting your user information from the server',
                });
            },
        });
    }

    deleteAccount() {
        if (!this.accountDeletionForm.valid) {
            console.log('invalid input');
            this.messageService.add({
                key: 'br',
                severity: 'warn',
                summary: 'This might be a sign',
                detail: "Please don't leave, but if you still do want to leave, you must check the checkmark above the button first.",
            });
            return;
        }

        this.userService
            .deleteUser({
                userId: this.currentUser.id,
            })
            .subscribe({
                next: (response) => {
                    if (response) {
                        this.messageService.add({
                            key: 'br',
                            severity: 'success',
                            summary: 'User deleted',
                            detail: 'Sorry to see you go, hope you come back some day :<',
                        });
                        this.authService.logOut();
                    }
                },
                error: (response) => {
                    this.messageService.add({
                        key: 'br',
                        severity: 'error',
                        summary: 'Something went wrong. ',
                        detail:
                            'Your user was not deleted. Server said: ' +
                            response.error.message,
                    });
                },
            });
    }
}
