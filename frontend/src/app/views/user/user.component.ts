import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/models/entity/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    userId: number = 0;
    user: User = new User();

    constructor(
        private activatedRoute: ActivatedRoute,
        private userService: UserService
    ) {
        this.activatedRoute.params.subscribe({
            next: (params) => {
                this.userId = params['id'];
            },
        });
    }

    ngOnInit(): void {
        this.userService.getUser(this.userId).subscribe({
            next: (response) => {
                this.user = response;
                this.user.nuts?.forEach((nut, index) => {
                    if (this.user.nuts !== undefined) {
                        this.user.nuts[index].date = new Date(nut.date);
                    }
                });
            },
        });
    }
}
