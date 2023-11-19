import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest, LoginResponse, User } from '../features/models/auth.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { 
      
    }
    $user = new BehaviorSubject<User | undefined>(undefined);
    login(request: LoginRequest): Observable<LoginResponse> {
      return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
        email: request.email,
        password: request.password
      });
    }

    register(request: LoginRequest): Observable<any> {
      return this.http.post<any>(`${environment.apiBaseUrl}/api/auth/register`, {
        email: request.email,
        password: request.password
      });
    }


    logout(): void {
      localStorage.clear();
      this.cookieService.delete('Authorization', '/');
      this.$user.next(undefined);
    }

    setUser(user: User): void {
      this.$user.next(user);
      localStorage.setItem('user-email', user.email);
      localStorage.setItem('user-roles', user.roles.join(','));
    }
  
    user() : Observable<User | undefined> {
      return this.$user.asObservable();
    }

    getUser(): User | undefined {
      const email = localStorage.getItem('user-email');
      const roles = localStorage.getItem('user-roles');
  
      if (email && roles) {
        const user: User = {
          email: email,
          roles: roles.split(',')
        };
  
        return user;
      }
  
      return undefined;
    }

}
