import { Component } from '@angular/core';
import { CategoriesMenu } from '../categories/components/categories-menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CategoriesMenu],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
