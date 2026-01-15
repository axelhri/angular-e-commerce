import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { loadStripe, PaymentIntentResult, Stripe, StripeElements } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private readonly stripePromise = loadStripe(environment.stripeKey);

  async getStripe(): Promise<Stripe> {
    const stripe = await this.stripePromise;
    if (!stripe) throw new Error('Stripe not loaded');
    return stripe;
  }

  async confirmPayment(elements: StripeElements): Promise<PaymentIntentResult> {
    const stripe = await this.getStripe();

    return stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:4200',
      },
    });
  }
}
