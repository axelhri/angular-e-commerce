import { Component, inject } from '@angular/core';
import { ProductsFacade } from '../services/products.facade';
import { SlicePipe } from '@angular/common';
import { StarRatingComponent } from '../../../star-rating/star-rating.component';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-products-list',
  standalone: true,
  providers: [ProductsFacade],
  templateUrl: './products-list.component.html',
  imports: [StarRatingComponent, CurrencyPipe, SlicePipe, CurrencyPipe],
})
export class ProductsListComponent {
  readonly facade = inject(ProductsFacade);
}
