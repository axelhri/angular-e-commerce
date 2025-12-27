import { Component, inject } from '@angular/core';
import { ProductsFacade } from '../services/products.facade';

@Component({
  selector: 'app-products-list',
  standalone: true,
  providers: [ProductsFacade],
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent {
  readonly facade = inject(ProductsFacade);
}
