import { Component, inject } from '@angular/core';
import { ProductsFacade } from '../services/products.facade';
import { StarRatingComponent } from '../../../star-rating/star-rating.component';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-products-list',
  standalone: true,
  providers: [ProductsFacade],
  templateUrl: './products-list.component.html',
  imports: [StarRatingComponent, CurrencyPipe, CurrencyPipe, TruncatePipe],
})
export class ProductsListComponent {
  readonly facade = inject(ProductsFacade);
}
