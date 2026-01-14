import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CartProductsService } from '../services/cart-products.service';
import { CartProducts } from '../models/cart-products';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './user-cart.component.html',
})
export class UserCartComponent implements OnInit {
  private readonly cartProductsService = inject(CartProductsService);
  private readonly router = inject(Router);
  readonly products = signal<CartProducts[]>([]);
  readonly isLoading = signal<boolean>(false);

  readonly errorMessage = signal<string | null>(null);

  readonly totalAmount = computed(() => {
    return this.products().reduce((sum, p) => sum + p.product_price * p.product_quantity, 0);
  });

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
  }

  addProductToCart(productId: string): void {
    this.isLoading.set(true);

    this.cartProductsService
      .addProductToCart({
        product_id: productId,
        product_quantity: 1,
      })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => this.updateProductState(productId, res.data),
      });
  }

  removeProductFromCart(productId: string): void {
    this.isLoading.set(true);

    const request = { product_id: productId, product_quantity: 1 };

    this.cartProductsService
      .removeProductQuantityFromCart(request)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.updateProductState(productId, null);
        },
      });
  }

  private updateProductState(productId: string, updatedItem: CartProducts | null): void {
    this.products.update((items) => {
      if (updatedItem) {
        const index = items.findIndex((i) => i.product_id === productId);
        if (index === -1) return [...items, updatedItem];
        return items.map((item) => (item.product_id === productId ? updatedItem : item));
      }

      return items
        .map((item) => {
          if (item.product_id === productId) {
            return { ...item, product_quantity: item.product_quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.product_quantity > 0);
    });
  }

  initiateCheckout(): void {
    const itemsIds = this.products().map((item) => item.cart_item_id);

    this.router.navigate(['/checkout'], {
      state: { ids: itemsIds },
    });
  }
}
