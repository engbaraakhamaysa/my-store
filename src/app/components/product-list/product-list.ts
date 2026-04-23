import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService';
import { Product } from '../../models/product.model';
import { ProductItem } from '../product-item/product-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItem],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList implements OnInit {
  products$!: Observable<Product[]>;

  message: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  showMessage(productName: string) {
    alert(`Product added: ${productName} ✅`);
  }
}
