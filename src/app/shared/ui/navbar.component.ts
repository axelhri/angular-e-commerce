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
import { CategoriesList } from '../../features/categories/components/categories-list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, NgIcon, RouterLink, CategoriesMenu, CommonModule, CategoriesList],
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

  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isDesktop$ = this.breakpointObserver
    .observe('(min-width: 1024px)')
    .pipe(map((result) => result.matches));

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
