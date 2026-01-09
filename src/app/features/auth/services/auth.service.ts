import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationRequest } from '../models/authentication-request';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../models/authentication-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}auth`;
  private readonly http = inject(HttpClient);

  register(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/register}`, request);
  }
}
