import { Component, inject } from '@angular/core';
import { SingleProductFacade } from '../services/single-product.facade';
import { CartProductsService } from '../../cart/services/cart-products.service';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';

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
