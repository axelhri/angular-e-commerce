import { effect, inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './products.service';
import { ProductResponse } from '../models/product-response';
import { finalize } from 'rxjs';

@Injectable()
export class SingleProductFacade {
  private readonly productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);

  readonly product = signal<ProductResponse | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const slug = this.route.snapshot.paramMap.get('slug');

      if (slug) {
        this.loadProduct(slug);
      }
    });
  }

  private loadProduct(slug: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.productsService
      .getProductBySlug(slug)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (product) => this.product.set(product),
        error: () => this.error.set('Produit introuvable'),
      });
  }
}
