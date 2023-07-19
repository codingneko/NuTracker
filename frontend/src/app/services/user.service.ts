import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../utils/Constants';
import { DeleteUserRequest } from '../models/request/DeleteUserRequest.interface';
import { Observable } from 'rxjs';
import User from '../models/entity/user.interface';
import UploadAvatarRequest from '../models/request/UploadAvatarRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  getUser(jwt: string): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + jwt);
    return this.httpClient.get<User>(Constants.base_user_url, {
      headers: headers,
      params: {
        jwt: jwt
      }
    });
  }

  deleteUser(deleteUserRequest: DeleteUserRequest): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + deleteUserRequest);
    return this.httpClient.delete<boolean>(Constants.base_user_url, {
      headers: headers,
      body: deleteUserRequest
    });
  }

  uploadAvatar(body: UploadAvatarRequest) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + body.jwt);

    return this.httpClient.post(Constants.base_user_url + '/uploadAvatar', {
      headers: headers,
      body: body
    })
  }
}
