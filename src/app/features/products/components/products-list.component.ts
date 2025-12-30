import { Component, inject } from '@angular/core';
import { ProductsFacade } from '../services/products.facade';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { StarRatingComponent } from '../../../star-rating/star-rating.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  providers: [ProductsFacade],
  templateUrl: './products-list.component.html',
  imports: [StarRatingComponent, CurrencyPipe, SlicePipe],
})
export class ProductsListComponent {
  readonly facade = inject(ProductsFacade);
}
