import { Component, inject } from '@angular/core';
import { SingleProductFacade } from '../services/single-product.facade';

@Component({
  selector: 'app-single-product',
  standalone: true,
  providers: [SingleProductFacade],
  imports: [],
  templateUrl: './single-product.component.html',
})
export class SingleProductComponent {
  readonly facade = inject(SingleProductFacade);
}
