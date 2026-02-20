import { effect, inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductSummary } from '../models/product-summary';
import { finalize, map, timer, zip } from 'rxjs';
import { ProductsService } from './products.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class ProductsFacade {
  private productService = inject(ProductsService);
  private route = inject(ActivatedRoute);

  private readonly queryParams = toSignal(this.route.queryParamMap, {
    initialValue: this.route.snapshot.queryParamMap,
  });

  readonly search = signal('');
  readonly page = signal(0);

  readonly products = signal<ProductSummary[]>([]);
  readonly totalPages = signal(0);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly minLoad$ = timer(500);

  constructor() {
    effect(() => {
      const params = this.queryParams();

      this.search.set(params.get('search') ?? '');
      this.page.set(Number(params.get('page') ?? 0));

      const categoryId = params.get('categoryId') ?? undefined;

      this.load(categoryId);
    });
  }

  private load(categoryId?: string): void {
    this.loading.set(true);
    this.error.set(null);

    const apiRequest$ = this.productService.getProducts({
      search: this.search(),
      page: this.page(),
      categoryId: categoryId, // 🔹 ajoute ici
    });

    zip(apiRequest$, this.minLoad$)
      .pipe(
        map(([res]) => res),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this.products.set(res.data.content);
          this.totalPages.set(res.data.totalPages);
        },
        error: () => this.error.set('Oh no! Something went wrong!'),
      });
  }
}
