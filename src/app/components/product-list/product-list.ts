import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../services/productService';
import { Product } from '../../models/product.model';
import { ProductItem } from '../product-item/product-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItem],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    //Get All Product
    this.products$ = this.productService.getProducts();
  }
}
