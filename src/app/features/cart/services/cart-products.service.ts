import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartProducts } from '../models/cart-products';
import { ApiResponse } from '../../../shared/models/api-response';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CartTotal } from '../models/cart-total';

@Injectable({
  providedIn: 'root',
})
export class CartProductsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}cart`;

  getCartProducts(): Observable<ApiResponse<CartProducts[]>> {
    return this.http.get<ApiResponse<CartProducts[]>>(this.apiUrl);
  }

  getCartTotalAmount(): Observable<CartTotal> {
    return this.http.get<CartTotal>(`${this.apiUrl}/total`);
  }
}
