import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly router = inject(Router);

  readonly searchForm = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
  });

  onSearch(): void {
    const search = this.searchForm.controls.search.value.trim() || null;

    this.router.navigate(['/products'], {
      queryParams: { search, page: 0 },
      queryParamsHandling: 'merge',
    });
  }
}
