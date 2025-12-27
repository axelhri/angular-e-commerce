import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response';
import { PagedResponse } from '../../../shared/models/paged-response';
import { ProductSummary } from '../models/product-summary';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsQuery } from '../models/products-query';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly apiUrl = `${environment.apiUrl}products`;
  private readonly http = inject(HttpClient);

  getProducts(query: ProductsQuery = {}): Observable<ApiResponse<PagedResponse<ProductSummary>>> {
    const params = new HttpParams({
      fromObject: {
        page: query.page?.toString() ?? '0',
        size: query.size?.toString() ?? '10',
        ...(query.search && { search: query.search }),
        ...(query.categoryId && { categoryId: query.categoryId }),
      },
    });

    return this.http.get<ApiResponse<PagedResponse<ProductSummary>>>(this.apiUrl, { params });
  }
}
