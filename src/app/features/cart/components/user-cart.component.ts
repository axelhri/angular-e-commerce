import { Component, inject, OnInit, signal } from '@angular/core';
import { CartProductsService } from '../services/cart-products.service';
import { CartProducts } from '../models/cart-products';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './user-cart.component.html',
})
export class UserCartComponent implements OnInit {
  private readonly cartProductsService = inject(CartProductsService);
  readonly products = signal<CartProducts[]>([]);
  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.cartProductsService.getCartProducts().subscribe({
      next: (response) => {
        this.products.set(response.data);
      },
      error: () => {
        this.errorMessage.set('An error occurred while fetching cart products.');
      },
    });
  }
}
