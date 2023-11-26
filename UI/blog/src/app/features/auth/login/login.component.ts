import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../../models/auth.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  model: LoginRequest;
  isAnyServerError: boolean = false;
  errMsgs: any[] = [];
  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router) {
    this.model = {
      email: '',
      password: ''
    };
  }

  onFormSubmit(): void {
    this.authService.login(this.model)
    .subscribe({
      next: (response) => {
        // Set Auth Cookie
        this.cookieService.set('Authorization', `Bearer ${response.token}`,
        undefined, '/', undefined, true, 'Strict');

        // Set User
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });
        this.errMsgs = [];
        // Redirect back to Home
        this.router.navigateByUrl('/');

      },
      error: (err) =>{
        this.isAnyServerError = true;
        const errors = err?.error?.errors;
       //console.log(errors)
         this.errMsgs = [];
        if(errors){
          for (let [key, value] of Object.entries(errors)) {
            this.errMsgs.push(value);
          }
        }
        if(this.errMsgs.length == 0){
          this.errMsgs.push("Something went wrong!, Please try again later.")
        }
      }
    });
  }
}