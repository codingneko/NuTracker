import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from '../utils/Constants';
import { DeleteUserRequest } from '../models/request/DeleteUserRequest.interface';
import { Observable, map } from 'rxjs';
import User from '../models/entity/user.interface';
import UploadAvatarRequest from '../models/request/UploadAvatarRequest.interface';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import LeaderboardUser from '../models/entity/leaderboard-user.interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private authService: AuthService,
        private httpClient: HttpClient,
        private cookieService: CookieService
    ) {}

    getUser(userId?: number): Observable<User> {
        if (userId == undefined) {
            userId = this.getUserId();
        }

        return this.httpClient.get<User>(
            Constants.base_user_url + '/' + userId
        );
    }

    getUserId(): number {
        if (this.cookieService.get('JSESSIONID')) {
            let jwtInfo: any = jwt_decode<JwtPayload>(
                this.cookieService.get('JSESSIONID')
            );

            console.log(jwtInfo);
            return jwtInfo.userId;
        } else {
            return -1;
        }
    }

    deleteUser(deleteUserRequest: DeleteUserRequest): Observable<boolean> {
        return this.httpClient.delete<boolean>(Constants.base_user_url, {
            body: deleteUserRequest,
        });
    }

    uploadAvatar(body: UploadAvatarRequest) {
        return this.httpClient.post(Constants.base_user_url + '/uploadAvatar', {
            body: body,
        });
    }

    getLeaderboard(): Observable<LeaderboardUser[]> {
        return this.httpClient.get<LeaderboardUser[]>(
            Constants.base_user_url + '/leaderboard'
        );
    }
}
