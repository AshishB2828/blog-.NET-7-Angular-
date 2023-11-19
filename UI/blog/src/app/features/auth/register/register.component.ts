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

      },
      error: err => {
        console.log("failed")
      }
    });
  }

}
