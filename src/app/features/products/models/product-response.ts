import { ProductImages } from './product-images';
import { VendorSummary } from './vendor-summary';

export interface ProductResponse {
  product_id: string;
  product_name: string;
  product_price: number;
  product_description: string;
  product_stock: number;
  product_images: ProductImages[];
  vendor: VendorSummary;
}
