import { Component, Input, OnChanges, OnInit } from '@angular/core';

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
export class AvatarComponent implements OnChanges {
    @Input()
    avatarUrl = '/assets/avatar.png';

    @Input()
    size: AvatarSize = AvatarSize.NORMAL;

    ngOnChanges(): void {
        if (!this.avatarUrl || this.avatarUrl.length < 5) {
            this.avatarUrl = '/assets/avatar.png';
        }
    }
}
