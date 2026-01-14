import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  private readonly checkoutService = inject(CheckoutService);
  readonly ids = signal<string[]>(history.state.ids ?? []);

  readonly form = new FormGroup({
    first_name: new FormControl('', { nonNullable: true }),
    last_name: new FormControl('', { nonNullable: true }),
    address_line: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
    country: new FormControl('', { nonNullable: true }),
    state: new FormControl('', { nonNullable: true }),
    postal_code: new FormControl('', { nonNullable: true }),
  });

  onCheckout(): void {
    console.log('ids', this.ids());
    console.log('form', this.form.getRawValue());
    const request = {
      cart_items: this.ids(),
      shipping_address: this.form.getRawValue(),
    };

    this.checkoutService.checkout(request).subscribe({
      next: (response) => {
        console.log('success', response);
      },
      error: (err) => {
        console.error('error', err);
      },
    });
  }
}
