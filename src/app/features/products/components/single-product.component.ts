import { Component, inject } from '@angular/core';
import { SingleProductFacade } from '../services/single-product.facade';
import { CartProductsService } from '../../cart/services/cart-products.service';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { finalize } from 'rxjs';
import { BookmarksService } from '../../bookmarks/services/bookmarks.service';

@Component({
  selector: 'app-single-product',
  standalone: true,
  providers: [SingleProductFacade],
  imports: [CurrencyPipe],
  templateUrl: './single-product.component.html',
})
export class SingleProductComponent {
  readonly facade = inject(SingleProductFacade);
  private readonly cartService = inject(CartProductsService);
  private readonly bookmarkService = inject(BookmarksService);

  activeImage: string | null = null;

  setActiveImage(image: string): void {
    this.activeImage = image;
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

  addProductToBookmarks(productId: string): void {
    this.bookmarkService
      .bookmarkProduct({
        product_id: productId,
      })
      .subscribe({
        next: (res) => {
          console.log('Product added to bookmark', res);
        },
        error: (err) => {
          console.error('Failed to add product', err);
        },
      });
  }
}
