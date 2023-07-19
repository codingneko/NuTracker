import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-navbar-desktop',
    templateUrl: './navbar-desktop.component.html',
    styleUrls: ['./navbar-desktop.component.scss'],
})
export class NavbarDesktopComponent implements OnInit{
    loggedIn: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.getSession().subscribe({
            next: sessionId => {
                console.log(sessionId);
                // This is garbage. It's times like this I wish I had Java.String.isEmpty()
                this.loggedIn = !(!sessionId?.length);
            }
        });
    }

    logOut() {
        this.authService.logOut();
    }
}
