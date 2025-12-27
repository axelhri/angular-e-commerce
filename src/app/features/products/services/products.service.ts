import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environement';
import { ApiResponse } from '../../../shared/models/api-response';
import { PagedResponse } from '../../../shared/models/paged-response';
import { ProductSummary } from '../models/product-summary';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly API_URL = environment.apiUrl + 'products';
  private readonly http = inject(HttpClient);

  getProducts(
    categoryId?: string,
    search?: string,
    page = 0,
    size = 10,
  ): Observable<ApiResponse<PagedResponse<ProductSummary>>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    if (categoryId) params = params.set('categoryId', categoryId);
    if (search) params = params.set('search', search);

    return this.http.get<ApiResponse<PagedResponse<ProductSummary>>>(this.API_URL, {
      params,
    });
  }
}
