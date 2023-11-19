import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/models/auth.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User|undefined;
  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit() {

    this.authService.user().subscribe({
      next: user => {
        this.user = user;
      }
    })

    this.user = this.authService.getUser();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/login"])
  }


}
