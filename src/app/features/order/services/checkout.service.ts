import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../shared/models/api-response';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CheckoutRequest } from '../models/checkout-request';
import { CheckoutResponse } from '../models/checkout-response';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}orders`;

  checkout(request: CheckoutRequest): Observable<ApiResponse<CheckoutResponse>> {
    return this.http.post<ApiResponse<CheckoutResponse>>(this.apiUrl, request);
  }
}
