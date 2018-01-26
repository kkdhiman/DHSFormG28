import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  environment = '';
  user = new User('', '', '', '', '', '', false, '');

  ngOnInit() {
    document.getElementById('whoami').textContent = 'LOGIN';
    this.getEnvironment();
    this.checkIfUserAuthenticated();
  }

  onLogin() {
    // DEBUG
    console.log(JSON.stringify(this.user));
    this.authService.authenticateUser(this.user);
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

}
