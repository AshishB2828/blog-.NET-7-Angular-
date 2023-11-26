import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { LoginRequest } from '../../models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: LoginRequest;
  isAnyServerError: boolean = false;
  errMsgs: any[] = [];
  constructor(private authService: AuthService,
    private router: Router) {
    this.model = {
      email: '',
      password: ''
    };
  }
  ngOnInit(): void {
      
  }
  onFormSubmit(): void {
    this.authService.register(this.model)
    .subscribe({
      next: (response) => {

        this.router.navigateByUrl('/login');
        this.isAnyServerError = false;
        this.errMsgs  = [];
      },
      error: err => {
        console.log("failed")
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
