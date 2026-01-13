import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsListComponent } from './features/products/components/products-list.component';
import { SingleProductComponent } from './features/products/components/single-product.component';
import { RegisterComponent } from './features/auth/components/register.component';
import { LoginComponent } from './features/auth/components/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:slug', component: SingleProductComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];
