import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/response/LoginResponse.interface';
import { RegisterResponse } from '../models/response/RegisterResponse.interface';
import { RegisterRequest } from '../models/request/RegisterRequest.interface';
import { LoginRequest } from '../models/request/LoginRequest.interface';
import { Constants } from '../utils/constants';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private httpClient: HttpClient) {}

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>(
            Constants.base_url + Constants.base_auth_url + '/login',
            loginRequest
        );
    }

    register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
        return this.httpClient.post<RegisterResponse>(
            Constants.base_url + Constants.base_auth_url + '/register',
            registerRequest
        );
    }
}
