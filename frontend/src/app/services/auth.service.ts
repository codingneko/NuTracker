import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/response/LoginResponse.interface';
import { RegisterResponse } from '../models/response/RegisterResponse.interface';
import { RegisterRequest } from '../models/request/RegisterRequest.interface';
import { LoginRequest } from '../models/request/LoginRequest.interface';
import { Constants } from '../utils/Constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private sessionId: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>(
            Constants.base_url + Constants.base_auth_url + '/login',
            loginRequest
        );
    }

    logOut() {
        this.sessionId.next('');
        this.cookieService.delete('JSESSIONID');
    }

    register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
        return this.httpClient.post<RegisterResponse>(
            Constants.base_url + Constants.base_auth_url + '/register',
            registerRequest
        );
    }

    getSession(): Observable<string> {
        return this.sessionId.asObservable();
    }

    setSession(sessionId: string): void {
        this.sessionId.next(sessionId);
    }
}
