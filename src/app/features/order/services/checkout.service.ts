import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../shared/models/api-response';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CheckoutRequest } from '../models/checkout-request';
import { CheckoutResponse } from '../models/checkout-response';
import { FetchOrder } from '../models/fetch-order';
import { OrderProductResponse } from '../models/order-product-response';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}orders`;

  checkout(request: CheckoutRequest): Observable<ApiResponse<CheckoutResponse>> {
    return this.http.post<ApiResponse<CheckoutResponse>>(this.apiUrl, request);
  }

  getOrderById(orderId: string): Observable<ApiResponse<FetchOrder>> {
    return this.http.get<ApiResponse<FetchOrder>>(`${this.apiUrl}/${orderId}`);
  }

  getOrderProducts(orderId: string): Observable<ApiResponse<OrderProductResponse[]>> {
    return this.http.get<ApiResponse<OrderProductResponse[]>>(`${this.apiUrl}/${orderId}/products`);
  }
}
