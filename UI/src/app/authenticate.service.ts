import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { User } from './user';

@Injectable()
export class AuthenticateService {

  private authURL = 'http://' + window.location.hostname + ':3000/user/authenticate';

  constructor(private http: HttpClient, private router: Router) { }

  authenticateUser(user) {
    console.log('Trying to Authenticate User -> ' + JSON.stringify(user));

    const req = this.http.post(this.authURL, {
      id: user.id,
      password: user.password
    });

    return req;
  }
}
