import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/models/api-response';
import { ManageBookmark } from '../models/manage-bookmark';
import { BookmarkResponse } from '../models/bookmark-response';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  private readonly apiUrl = `${environment.apiUrl}bookmarks`;
  private readonly http = inject(HttpClient);

  bookmarkProduct(request: ManageBookmark): Observable<ApiResponse<BookmarkResponse>> {
    return this.http.post<ApiResponse<BookmarkResponse>>(this.apiUrl, request);
  }

  removeProductFromBookmark(request: ManageBookmark): Observable<void> {
    return this.http.delete<void>(this.apiUrl, { body: request });
  }

  getUserBookmarks(): Observable<ApiResponse<BookmarkResponse[]>> {
    return this.http.get<ApiResponse<BookmarkResponse[]>>(this.apiUrl);
  }
}
