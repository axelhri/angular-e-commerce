import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { ProductsListComponent } from './features/products/components/products-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsListComponent },
  { path: '**', redirectTo: '' },
];
