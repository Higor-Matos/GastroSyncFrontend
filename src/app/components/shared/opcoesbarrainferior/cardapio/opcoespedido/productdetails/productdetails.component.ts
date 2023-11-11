// productdetails.component.ts
import { Component, Input } from '@angular/core';
import { Produto } from '../../../../models/produto.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductDetailsComponent {
  @Input()
  produto!: Produto;
}
