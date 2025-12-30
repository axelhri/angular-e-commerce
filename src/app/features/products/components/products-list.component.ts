import { Component, inject } from '@angular/core';
import { ProductsFacade } from '../services/products.facade';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { StarRatingComponent } from './star-rating.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  providers: [ProductsFacade],
  templateUrl: './products-list.component.html',
  imports: [StarRatingComponent, CurrencyPipe, CurrencyPipe, TruncatePipe, RouterLink],
})
export class ProductsListComponent {
  readonly facade = inject(ProductsFacade);
}
