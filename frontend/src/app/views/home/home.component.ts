import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    randomIntro = '';

    ngOnInit(): void {
        let randomIntros = [
            'A tracker for your nuts',
            'Squirrels love us',
            'What the fuck are you doing here again?',
            'HOOOOOOYAH!',
            "You're a true coomer",
            'Where did I put this damn nut',
            'Screw my nuts (?',
            'Nuts & Bolts',
        ];

        this.randomIntro =
            randomIntros[Math.floor(Math.random() * randomIntros.length)];
    }
}
