import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { ProductSummary } from '../models/product-summary';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
  private productService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  products = signal<ProductSummary[]>([]);
  totalPages = signal(0);
  currentPage = signal(0);
  currentSearch = signal('');

  ngOnInit() {
    this.route.queryParamMap
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((params) => {
          const querySearch = params.get('search') ?? '';
          const queryPage = +(params.get('page') ?? 0);

          this.currentSearch.set(querySearch);
          this.currentPage.set(queryPage);

          return this.productService.getProducts(undefined, querySearch, queryPage);
        }),
      )
      .subscribe((response) => {
        this.products.set(response.data.content);
        this.totalPages.set(response.data.totalPages);
        this.currentPage.set(response.data.page);
      });
  }
}
