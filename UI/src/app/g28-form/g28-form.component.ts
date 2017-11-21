import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-g28-form',
  templateUrl: './g28-form.component.html',
  styleUrls: ['./g28-form.component.css']
})
export class G28FormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkIfUserAuthenticated();
  }

  checkIfUserAuthenticated() {
    const currentUser = JSON.parse(localStorage.getItem('G28User'));
    if (currentUser === null || currentUser.authenticated !== true) {
      this.router.navigate(['/']);
    }
  }
}
