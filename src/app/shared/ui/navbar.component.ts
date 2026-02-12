import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  bootstrapPerson,
  bootstrapSuitHeart,
  bootstrapCart3,
  bootstrapSearch,
} from '@ng-icons/bootstrap-icons';
import { CategoriesMenu } from '../../features/categories/components/categories-menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, NgIcon, RouterLink, CategoriesMenu, CommonModule],
  providers: [
    provideIcons({ bootstrapPerson, bootstrapSuitHeart, bootstrapCart3, bootstrapSearch }),
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly router = inject(Router);

  readonly searchForm = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
  });

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearch(): void {
    const search = this.searchForm.controls.search.value.trim() || null;

    this.router.navigate(['/products'], {
      queryParams: { search, page: 0 },
      queryParamsHandling: 'merge',
    });

    this.isMenuOpen = false;
  }
}
