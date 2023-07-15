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

    constructor(private authService: AuthService, private cookieService: CookieService) {}

    ngOnInit(): void {
        this.authService.setSession(this.cookieService.get("JSESSIONID"));
        this.authService.getSession().subscribe({
            next: sessionId => {
                console.log(sessionId);
                if(sessionId) {
                    this.loggedIn = true;
                } else {
                    this.loggedIn = false;
                }
            }
        });
    }

    logOut() {
        this.authService.logOut();
    }
}
