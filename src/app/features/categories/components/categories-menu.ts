import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoryResponse } from '../models/category-response';
import { CategoriesService } from '../services/categories.service';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-menu.html',
})
export class CategoriesMenu implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  readonly categories = signal<CategoryResponse[]>([]);

  openedCategoryIds = new Set<string>();

  toggleCategory(category: CategoryResponse): void {
    if (category.children && category.children.length > 0) {
      if (this.openedCategoryIds.has(category.category_id)) {
        this.openedCategoryIds.delete(category.category_id);
      } else {
        this.openedCategoryIds.add(category.category_id);
      }
    }
  }

  isOpened(id: string): boolean {
    return this.openedCategoryIds.has(id);
  }

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
}
