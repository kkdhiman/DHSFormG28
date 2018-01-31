import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './user';

@Injectable()
export class CreateAccountService {
  private accountURL = 'http://' + window.location.hostname + ':3000/user/create-account';

  constructor(private http: HttpClient, private router: Router) { }

  createUserAccount(user) {

    console.log('Trying to Authenticate User -> ' + JSON.stringify(user));

    const req = this.http.post(this.accountURL, {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      email: user.email
    });

    return req;
  }

}
