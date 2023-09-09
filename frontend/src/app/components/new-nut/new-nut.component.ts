import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import Nut from 'src/app/models/entity/nut.interface';
import User from 'src/app/models/entity/user.interface';
import { NutService } from 'src/app/services/nut.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-new-nut',
    templateUrl: './new-nut.component.html',
    styleUrls: ['./new-nut.component.scss'],
})
export class NewNutComponent implements OnInit {
    @Output()
    formSubmitted = new EventEmitter();

    user: User = new User();

    nutForm = this.formBuilder.group({
        date: [''],
        description: [''],
        score: [''],
    });

    nut: Nut = {
        date: new Date(),
        description: '',
        score: 0,
        userId: 0,
    };

    constructor(
        private formBuilder: FormBuilder,
        private nutService: NutService,
        private userService: UserService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.userService.getUser().subscribe({
            next: (data) => {
                this.user = data;
                this.nutForm.valueChanges.subscribe({
                    next: (form) => {
                        this.nut.date = new Date(String(form.date));
                        this.nut.description = String(form.description);
                        this.nut.score = Number(form.score);
                        this.nut.userId = this.user.id;
                        console.log(this.nut);
                    },
                });
            },
        });
    }

    postNut() {
        this.nutService.postNut(this.nut).subscribe({
            next: (data) => {
                if (data.id !== null) {
                    this.messageService.add({
                        key: 'br',
                        severity: 'success',
                        summary: 'Correctly nutted',
                        detail: 'Your nut was successfuly added',
                    });
                }
            },
            error: (data) => {
                this.messageService.add({
                    key: 'br',
                    severity: 'error',
                    summary: 'Something went wrong',
                    sticky: true,
                    detail: data,
                });
            },
        });
    }
}
