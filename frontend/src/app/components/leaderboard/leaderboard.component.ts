import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import LeaderboardUser from 'src/app/models/entity/leaderboard-user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
    leaderboard: LeaderboardUser[] = [];

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.userService.getLeaderboard().subscribe({
            next: (data) => {
                this.leaderboard = data.map(user => ({
                    ...user,
                    score: Number(user.score)
                }));
            },
        });
    }

    goToUser(id: number) {
        this.router.navigate(['/user/' + id]);
    }
}
