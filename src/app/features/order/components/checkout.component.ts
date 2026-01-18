import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from '../services/checkout.service';
import { StripeService } from '../services/stripe.service';
import { StripeElements, StripePaymentElement } from '@stripe/stripe-js';
import { FetchOrder } from '../models/fetch-order';
import { OrderProductResponse } from '../models/order-product-response';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, TruncatePipe, CurrencyPipe],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  private readonly checkoutService = inject(CheckoutService);
  private readonly stripeService = inject(StripeService);
  readonly ids = signal<string[]>(history.state.ids ?? []);

  private orderId!: string;

  readonly order = signal<FetchOrder | null>(null);
  readonly products = signal<OrderProductResponse[]>([]);

  readonly form = new FormGroup({
    first_name: new FormControl('', { nonNullable: true }),
    last_name: new FormControl('', { nonNullable: true }),
    address_line: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    country: new FormControl('', { nonNullable: true }),
    state: new FormControl('', { nonNullable: true }),
    postal_code: new FormControl('', { nonNullable: true }),
  });

  private clientSecret!: string;
  private elements!: StripeElements;
  private paymentElement!: StripePaymentElement;

  onCheckout(): void {
    console.log('ids', this.ids());
    console.log('form', this.form.getRawValue());
    const request = {
      cart_items: this.ids(),
      shipping_address: this.form.getRawValue(),
    };

    this.checkoutService.checkout(request).subscribe({
      next: (response) => {
        this.clientSecret = response.data.client_secret;
        this.orderId = response.data.order.order_id;

        this.checkoutService.getOrderById(this.orderId).subscribe({
          next: (order) => {
            console.log(order.data);
            this.order.set(order.data);
          },
          error: (err) => {
            console.error(err);
          },
        });

        this.checkoutService.getOrderProducts(this.orderId).subscribe({
          next: (products) => {
            this.products.set(products.data);
          },
          error: (err) => {
            console.error(err);
          },
        });

        this.stripeService.getStripe().then((stripe) => {
          this.elements = stripe.elements({ clientSecret: this.clientSecret });
          this.paymentElement = this.elements.create('payment');
          this.paymentElement.mount('#payment-element');
          console.log('success', response);
        });
      },
      error: (err) => {
        console.error('error', err);
      },
    });
  }

  async pay(): Promise<void> {
    await this.stripeService.confirmPayment(this.elements);
  }
}
