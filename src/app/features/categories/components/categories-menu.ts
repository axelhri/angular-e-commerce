import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryResponse } from '../models/category-response';
import { CategoriesService } from '../services/categories.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapChevronDown } from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-menu',
  standalone: true,
  imports: [CommonModule, NgIcon],
  providers: provideIcons({ bootstrapChevronDown }),
  templateUrl: './categories-menu.html',
})
export class CategoriesMenu implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly router = inject(Router);
  readonly categories = signal<CategoryResponse[]>([]);

  openedCategoryIds = new Set<string>();

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(finalize(() => console.log('success')))
      .subscribe({
        next: (response) => {
          this.categories.set(response.data);
          console.log(response);
        },
        error: () => {
          console.log('error');
        },
      });
  }

  toggleCategory(category: CategoryResponse): void {
    if (category.children && category.children.length > 0) {
      if (this.openedCategoryIds.has(category.category_id)) {
        this.openedCategoryIds.delete(category.category_id);
      } else {
        this.openedCategoryIds.add(category.category_id);
      }
      return;
    }

    this.router.navigate(['/products'], {
      queryParams: {
        categoryId: category.category_id,
        page: 0,
      },
      queryParamsHandling: 'merge',
    });
  }

  isOpened(id: string): boolean {
    return this.openedCategoryIds.has(id);
  }
}
