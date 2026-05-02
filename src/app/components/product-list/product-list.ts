import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/productService';
import { Product } from '../../models/product.model';
import { ProductItem } from '../product-item/product-item';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItem],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList implements OnInit {
  products$!: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
  ) {}

  // Get All Prudcts using  Observable
  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }
  //Tester Massege
  showMessage(productName: string) {
    this.toastr.success(`Product added: ${productName}`, 'Success');
  }
}
