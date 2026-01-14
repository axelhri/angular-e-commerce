import { OrderResponse } from './order-response';

export interface CheckoutResponse {
  order: OrderResponse;
  client_secret: string;
}
