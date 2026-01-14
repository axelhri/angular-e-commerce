import { ShippingAddress } from './shipping-address';

export interface CheckoutRequest {
  cart_items: string[];
  shipping_address: ShippingAddress;
}
