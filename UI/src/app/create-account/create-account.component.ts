import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  user = new User('', '', '', '', '', '', false, '');
  password1 = ''
  password2 = ''

  constructor(private router: Router) { }

  ngOnInit() {
    document.getElementById('whoami').textContent = 'CREATE NEW ACCOUNT';
  }

  cancel() {
    this.router.navigate(['/']);
  }

  createNewAccount() {
    // TODO: Create an account and take user bak to login screen
  }

}
