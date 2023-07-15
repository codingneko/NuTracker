import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../utils/Constants';
import { DeleteUserRequest } from '../models/request/DeleteUserRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  deleteUser(deleteUserRequest: DeleteUserRequest, jwt: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + jwt);
    return this.httpClient.delete<boolean>(Constants.base_url + Constants.base_user_url, {
      headers: headers,
      body: deleteUserRequest
    });
  }
}
