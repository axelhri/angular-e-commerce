import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response';
import { CategoryResponse } from '../models/category-response';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  private readonly apiUrl = `${environment.apiUrl}categories`;
  private readonly http = inject(HttpClient);

  getCategories(): Observable<ApiResponse<CategoryResponse[]>> {
    return this.http.get<ApiResponse<CategoryResponse[]>>(this.apiUrl);
  }
}
