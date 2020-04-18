import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../_model/user';
import { environment } from '../env/environment';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    apiUrl = environment.apiUrl;
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<User>;
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

    constructor(
      private http: HttpClient,
      private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;  // TO:DO
    }

    login(name: string, password: string) {
      return this.http.post<any>(`${this.apiUrl}/signin`, { name, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.storeTokens(user);
            return user;
      }));
    }

    register(name: string, password: string, email: string) {
      return this.http.post<any>(`${this.apiUrl}/register-user`, { name, password, email })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.storeTokens(user);
            return user.user;
      }));
    }

    logout() {
        // remove user from local storage to log user out
        this.currentUserSubject.next(null);
        ['currentUser', this.JWT_TOKEN, this.REFRESH_TOKEN].forEach(ele => {
          sessionStorage.getItem(ele) && sessionStorage.removeItem(ele);
        });
        this.router.navigate(['/login'] );
    }

    refreshToken() {
      return this.http.post<any>(`${this.apiUrl}/token`, {refreshToken: this.getRefreshToken()})
        .pipe(tap((tokens: any) => {
          this.storeJwtToken(tokens.token);
          return tokens;
      }));
    }

    getJwtToken() {
      return sessionStorage.getItem(this.JWT_TOKEN);
    }

    private getRefreshToken() {
      return sessionStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeJwtToken(token: string) {
      sessionStorage.setItem(this.JWT_TOKEN, token);
    }

    private storeTokens(tokens: any) {
      sessionStorage.setItem(this.JWT_TOKEN, tokens.token);
      sessionStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    }
}
