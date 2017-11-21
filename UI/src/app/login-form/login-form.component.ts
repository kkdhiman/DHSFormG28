import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private authService: AuthenticateService, private router: Router) { }

  user = new User('', '', false, '');

  ngOnInit() {
    this.checkIfUserAuthenticated();
  }

  onLogin() {
    // DEBUG
    console.log(JSON.stringify(this.user));
    console.log(JSON.stringify(this.authService.authenticateUser(this.user)));

    if (this.user.authenticated === true) {
      localStorage.setItem('G28User', JSON.stringify(this.user));
      this.router.navigate(['/form']);
    } else {
      localStorage.removeItem('G28User');
      this.router.navigate(['/']);
    }
  }

  checkIfUserAuthenticated() {
    const currentUser = JSON.parse(localStorage.getItem('G28User'));
    if (currentUser !== null && currentUser.authenticated === true) {
      this.router.navigate(['/form']);
    }
  }

}
