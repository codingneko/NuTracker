import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar-desktop',
    templateUrl: './navbar-desktop.component.html',
    styleUrls: ['./navbar-desktop.component.scss'],
})
export class NavbarDesktopComponent {
    loggedIn: boolean = false;
}
