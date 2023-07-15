import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import jwtDecode from 'jwt-decode';


@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
    jwt: string = '';

    accountDeletionForm: FormGroup = this.formBuilder.group({
        accountDeletionCheckbox: ['', Validators.required]
    });

    constructor(
        private userService: UserService, 
        private authService: AuthService, 
        private formBuilder: FormBuilder, 
        private messageService: MessageService){}

    ngOnInit(): void {
        this.authService.getSession().subscribe({
            next: jwt => {
                this.jwt = jwt;
            }
        })
    }

    deleteAccount() {
        if (!this.accountDeletionForm.valid) {
            console.log('invalid input');
            this.messageService.add({
                key: 'br',
                severity: 'warn',
                summary: 'This might be a sign',
                detail: 'Please don\'t leave, but if you still do want to leave, you must check the checkmark above the button first.'
            });
            return;
        }

        let jwtInfo: any = jwtDecode(this.jwt);

        this.userService.deleteUser({userId: jwtInfo.userId}, this.jwt).subscribe({
            next: response => {
                if (response) {
                    this.messageService.add({
                        key: 'br',
                        severity: 'success',
                        summary: 'User deleted',
                        detail: 'Sorry to see you go, hope you come back some day :<'
                    });
                    this.authService.logOut();
                }
            },
            error: response => {
                this.messageService.add({
                    key: 'br',
                    severity: 'error',
                    summary: 'Something went wrong. ',
                    detail: 'Your user was not deleted. Server said: ' + response.error.message
                })
            }
        });
    }
}
