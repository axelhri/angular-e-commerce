import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize, forkJoin, map, of, switchMap } from 'rxjs';
import { BookmarksService } from '../services/bookmarks.service';
import { BookmarkResponse } from '../models/bookmark-response';
import { ProductsService } from '../../products/services/products.service';
import { ProductResponse } from '../../products/models/product-response';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';

export interface BookmarkWithProduct extends BookmarkResponse {
  product: ProductResponse;
}

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CurrencyPipe, TruncatePipe],
  templateUrl: './bookmarks.component.html',
})
export class BookmarksComponent implements OnInit {
  private readonly bookmarkService = inject(BookmarksService);
  private readonly productService = inject(ProductsService);

  readonly bookmarksWithProducts = signal<BookmarkWithProduct[]>([]);
  readonly isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.isLoading.set(true);

    this.bookmarkService
      .getUserBookmarks()
      .pipe(
        switchMap((response) => {
          const bookmarks = response.data;
          if (bookmarks.length === 0) {
            return of([]);
          }

          const productObservables = bookmarks.map((bookmark) =>
            this.productService.getProductById(bookmark.product_id).pipe(
              map((productApiResponse) => ({
                ...bookmark,
                product: productApiResponse.data,
              })),
            ),
          );

          return forkJoin(productObservables);
        }),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (bookmarksWithProducts) => {
          this.bookmarksWithProducts.set(bookmarksWithProducts);
        },
        error: (err) => {
          console.error('Failed to load bookmarks or products', err);
        },
      });
  }

  removeProductFromBookmarks(productId: string): void {
    this.bookmarkService
      .removeProductFromBookmark({
        product_id: productId,
      })
      .subscribe({
        next: () => {
          this.bookmarksWithProducts.update((current) =>
            current.filter((item) => item.product_id !== productId),
          );
        },
        error: (err) => {
          console.error('Failed to remove product', err);
        },
      });
  }
}
