import { Component, Input, OnInit } from '@angular/core';

enum AvatarSize {
    MICRO = 20,
    SMALL = 50,
    NORMAL = 150,
    LARGE = 300,
    VERY_LARGE = 600,
}

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
    @Input()
    avatarUrl = '/assets/avatar.png';

    @Input()
    size: AvatarSize = AvatarSize.NORMAL;

    ngOnInit(): void {
        // This stupid shit is needed because for some reason Angular decided it was a good idea
        // to load ngOnInit before the @Input, so @Input overwrites this if we don't wait.
        setTimeout(() => {
            if (!this.avatarUrl || this.avatarUrl.length < 5) {
                this.avatarUrl = '/assets/avatar.png';
            }
        }, 200);
    }
}
