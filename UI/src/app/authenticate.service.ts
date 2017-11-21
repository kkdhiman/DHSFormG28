import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class AuthenticateService {

  // TODO: Make this configurable and point to authentication
  // microservice.
  private authURL = '/mock/authservice';

  constructor(private http: HttpClient) { }

  authenticateUser(user): Observable<User> {
    // return this.http.get<User>(this.authURL);
    if (user.email === '' || user.password === '') {
      user.authenticated = false;
      user.jwt = 'INVALID';
    } else {
      user.authenticated = true;
      user.jwt = 'XYZ1234';
    }
    return user;
  }

}
