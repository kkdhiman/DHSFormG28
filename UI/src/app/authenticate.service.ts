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
    }).subscribe(
        res => {
          console.log(res);
          try {
            if (!res['success'] && !user.authenticated) {
              // TODO: Make a nicer alert dialog box
              alert('Unknown userid/password combination');
              try {
                localStorage.removeItem('G28User');
              } catch (e) {}
              this.router.navigate(['/']);
            } else {
              user = res['user'];
              try {
                // TODO: Validate User JWT Token expiration
                localStorage.setItem('G28User', JSON.stringify(user));
              } catch (e) {}
              this.router.navigate(['/form']);
            }
          } catch (e) {
            alert('An Unexpected Exception Occurred!');
          }
          return user;
        },
        err => {
          console.log("Error occured");
          return user;
        }
    );
  }
}
