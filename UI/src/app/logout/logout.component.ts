import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('Logging the user out!');

    // Remove locally stored user info and navigate back to home page
    try {
      localStorage.removeItem('G28User');
      this.router.navigate(['/']);
    } catch (e) {
      console.log('Unexpected exception logging out: ' + JSON.stringify(e));
    }
  }

}
