import { Component, inject, OnInit, signal } from '@angular/core';
import { CartProductsService } from '../services/cart-products.service';
import { CartProducts } from '../models/cart-products';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './user-cart.component.html',
})
export class UserCartComponent implements OnInit {
  private readonly cartProductsService = inject(CartProductsService);
  readonly products = signal<CartProducts[]>([]);
  readonly totalAmount = signal<number>(0);
  readonly isLoading = signal<boolean>(false);

  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.cartProductsService
      .getCartProducts()
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.products.set(response.data);
        },
        error: () => {
          this.errorMessage.set('An error occurred while fetching cart products.');
        },
      });

    this.cartProductsService.getCartTotalAmount().subscribe({
      next: (response) => {
        this.totalAmount.set(response.total);
        console.log(response);
      },
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    this.isLoading.set(true);

    this.cartProductsService
      .addProductToCart({
        product_id: productId,
        product_quantity: Number(quantity),
      })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => this.updateProductState(res.data),
      });
  }

  private updateProductState(updatedItem: CartProducts): void {
    this.products.update((items) => {
      const index = items.findIndex((i) => i.product_id === updatedItem.product_id);

      if (index === -1) {
        return [...items, updatedItem];
      }

      return items.map((item) => (item.product_id === updatedItem.product_id ? updatedItem : item));
    });

    this.totalAmount.set(
      this.products().reduce((sum, p) => sum + p.product_price * p.product_quantity, 0),
    );
  }
}
