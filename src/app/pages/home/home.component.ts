import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUser() {
    this.authService.getUserData().pipe(take(1)).subscribe(resp => {
      console.log(resp);
      this.user = resp;
    });
  }

}
