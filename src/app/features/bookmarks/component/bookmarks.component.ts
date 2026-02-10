import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize, forkJoin, map, of, switchMap } from 'rxjs';
import { BookmarksService } from '../services/bookmarks.service';
import { BookmarkResponse } from '../models/bookmark-response';
import { ProductsService } from '../../products/services/products.service';
import { ProductResponse } from '../../products/models/product-response';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { CartProductsService } from '../../cart/services/cart-products.service';

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
  private readonly cartService = inject(CartProductsService);

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

  addProductToCart(productId: string): void {
    this.cartService.addProductToCart({ product_id: productId, product_quantity: 1 }).subscribe({
      next: (res) => {
        console.log('Product added to cart', res);
      },
      error: (err) => {
        console.error('Failed to add product', err);
      },
    });
  }
}
