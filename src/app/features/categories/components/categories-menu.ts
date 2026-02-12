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
