import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { CategoryResponse } from '../models/category-response';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [],
  templateUrl: './categories-list.html',
})
export class CategoriesList implements OnInit {
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
