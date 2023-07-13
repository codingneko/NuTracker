import { Component, OnInit } from '@angular/core';
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
            next: session => {
                console.log(session);
                if (session.jwtToken) {
                    this.loggedIn = true;
                }
            }
        })
    }
}
