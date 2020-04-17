import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

import { AuthenticationService } from '../_services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authenticationService.getJwtToken()) {
            request = this.addToken(request, this.authenticationService.getJwtToken());
        }
        return next.handle(request).pipe(catchError(err => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
                return this.handle401Error(request, next);
            } else {
                const error = err.error.message || err.statusText;
                return throwError(error);
            }
        }));

    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          this.refreshTokenSubject.next(null);
          return this.authenticationService.refreshToken().pipe(
            switchMap((token: any) => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(token.token);
              return next.handle(
                  this.addToken(request, token.token)
                  );
            }));
        } else {
          return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(token => {
              return next.handle(this.addToken(request, token));
            }));
        }
      }

      private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
}
