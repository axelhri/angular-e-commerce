import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-products-list-skeleton',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './products-list-skeleton.component.html',
})
export class ProductsListSkeletonComponent {}
