import { Component, inject } from '@angular/core';
import { ProductsFacade } from '../services/products.facade';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { StarRatingComponent } from './star-rating.component';
import { RouterLink } from '@angular/router';
import { ProductsListSkeletonComponent } from './products-list-skeleton.component';
import { CartProductsService } from '../../cart/services/cart-products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  providers: [ProductsFacade],
  templateUrl: './products-list.component.html',
  imports: [
    StarRatingComponent,
    CurrencyPipe,
    CurrencyPipe,
    TruncatePipe,
    RouterLink,
    ProductsListSkeletonComponent,
  ],
})
export class ProductsListComponent {
  readonly facade = inject(ProductsFacade);
  readonly cartService = inject(CartProductsService);

  readonly skeletons = Array.from({ length: 40 }, (_, i) => i);

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
