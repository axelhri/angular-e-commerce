import { Component, inject } from '@angular/core';
import { ProductsFacade } from '../services/products.facade';
import { CurrencyPipe } from '../../../shared/pipes/currency.pipe';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { StarRatingComponent } from './star-rating.component';
import { RouterLink } from '@angular/router';
import { ProductsListSkeletonComponent } from './products-list-skeleton.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  providers: [ProductsFacade],
  templateUrl: './products-list.component.html',
  imports: [
    StarRatingComponent,
    CurrencyPipe,
    CurrencyPipe,
    TruncatePipe,
    RouterLink,
    ProductsListSkeletonComponent,
  ],
})
export class ProductsListComponent {
  readonly facade = inject(ProductsFacade);

  readonly skeletons = Array.from({ length: 40 }, (_, i) => i);
}
