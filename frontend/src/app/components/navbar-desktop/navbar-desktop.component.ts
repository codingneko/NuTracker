import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-navbar-desktop',
    templateUrl: './navbar-desktop.component.html',
    styleUrls: ['./navbar-desktop.component.scss'],
})
export class NavbarDesktopComponent implements OnInit {
    loggedIn: boolean = false;
    newNutDialogShown: boolean = false;

    constructor(
        private authService: AuthService,
        private cookieService: CookieService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.loggedIn = this.userService.getUserId() != -1;
        if (this.loggedIn) {
            this.userService.getUser().subscribe({
                next: (user) => {
                    console.log(user.id);
                    if (!user.id) {
                        this.authService.logOut();
                    }
                },
            });
        }
    }

    logOut() {
        this.authService.logOut();
    }

    onShowNewNutDialog(event: Event) {
        event.preventDefault();
        this.newNutDialogShown = true;
    }

    onCloseNewNutDialog() {
        this.newNutDialogShown = false;
    }

    onNewNut() {}
}
