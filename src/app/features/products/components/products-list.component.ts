import { Component, inject } from '@angular/core';
import { ProductsFacade } from '../services/products.facade';
import { bootstrapStar, bootstrapStarFill, bootstrapStarHalf } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  providers: [
    ProductsFacade,
    provideIcons({
      bootstrapStar,
      bootstrapStarFill,
      bootstrapStarHalf,
    }),
  ],
  templateUrl: './products-list.component.html',
  imports: [NgIcon, CurrencyPipe, SlicePipe],
})
export class ProductsListComponent {
  readonly facade = inject(ProductsFacade);

  getStars(rating: number): ('full' | 'half' | 'empty')[] {
    const stars: ('full' | 'half' | 'empty')[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }

    if (hasHalfStar) {
      stars.push('half');
    }

    while (stars.length < 5) {
      stars.push('empty');
    }

    return stars;
  }
}
