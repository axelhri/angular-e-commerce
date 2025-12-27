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
  readonly searchForm = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
  });
  private readonly router = inject(Router);

  onSearch() {
    const term = this.searchForm.controls.search.value.trim();
    this.router.navigate(['/products'], {
      queryParams: {
        search: term || null,
        page: 0,
      },
      queryParamsHandling: 'merge',
    });
  }
}
