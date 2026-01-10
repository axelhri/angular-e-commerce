import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, switchMap, catchError } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);

  private isRefreshing = false;
  private refreshSubject: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(
    null,
  );

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = req.clone({ withCredentials: true });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 || error.status === 401) {
          return this.handle401And403Error(authReq, next);
        } else {
          return throwError(() => error);
        }
      }),
    );
  }

  private handle401And403Error(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap(() => {
          this.isRefreshing = false;
          this.refreshSubject.next(true);
          return next.handle(req);
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => err);
        }),
      );
    } else {
      return this.refreshSubject.pipe(
        switchMap((tokenAvailable) => {
          if (tokenAvailable) return next.handle(req);
          return throwError(() => new Error('Refresh token failed'));
        }),
      );
    }
  }
}
