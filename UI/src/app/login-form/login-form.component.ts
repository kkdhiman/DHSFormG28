import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { User } from '../user';
import { AuthenticateService } from '../authenticate.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private configService: ConfigService, private authService: AuthenticateService, private router: Router) {
  }

  public loading = false;
  loginForm: FormGroup;
  environment = '';
  user = new User('', '', '', '', '', '', false, '');

  ngOnInit() {
    document.getElementById('whoami').textContent = 'LOGIN';
    this.getEnvironment();
    this.checkIfUserAuthenticated();
  }

  onLogin() {
    // DEBUG
    console.log('User Data ===> ' + JSON.stringify(this.user));
    this.loading = true;
    this.authService.authenticateUser(this.user).subscribe(
      res => {
        console.log(res);
        this.loading = false;
        try {
          if (!res['success']) {
            // TODO: Make a nicer alert dialog box
            alert('Unknown userid/password combination');
            try {
              localStorage.removeItem('G28User');
            } catch (e) {}
            this.router.navigate(['/']);
          } else {
            const authuser = res['user'];
            try {
              // TODO: Validate User JWT Token expiration
              localStorage.setItem('G28User', JSON.stringify(authuser));
            } catch (e) {}
            this.router.navigate(['/form']);
          }
        } catch (e) {
          alert('An Unexpected Exception Occurred!');
        }
      },
      err => {
        console.log('Error occured');
        this.loading = false;
        alert('An Unexpected Exception Occurred!');
      }
    );
  }

  createNewAccount()  {
    this.router.navigate(['/create-account']);
  }

  checkIfUserAuthenticated() {
    let authData = '{}';
    try {
      authData = localStorage.getItem('G28User');
    } catch (e) {}
    const currentUser = JSON.parse(authData);
    if (currentUser !== null && currentUser.authenticated === true) {
      this.router.navigate(['/form']);
    }
  }

  getEnvironment() {
    this.configService.getEnvConfig().then((config) => {
      if (config['DHS_G28_ENV'] !== null) {
        this.environment = '** ' + config['DHS_G28_ENV'] + ' Environment **';
      }
    }).catch((err) => {
      this.environment = '!! Unable To Contact Config Service !!';
    });
  }

  get diagnostic() { return JSON.stringify(this.user); }

}
