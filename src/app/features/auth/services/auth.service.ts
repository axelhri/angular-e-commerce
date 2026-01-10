import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationRequest } from '../models/authentication-request';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../models/register-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}auth/`;
  private readonly http = inject(HttpClient);

  register(request: AuthenticationRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}register`, request);
  }

  login(request: AuthenticationRequest): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}login`, request, { withCredentials: true });
  }
}
