import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/productService';
import { CartService } from '../../services/cartService';
import { Observable, switchMap, map } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-item-detail.html',
  styleUrl: './product-item-detail.css',
})
export class ProductItemDetail {
  quantity: number = 1;

  product$: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
  ) {
    this.product$ = this.route.params.pipe(
      switchMap((params) => {
        const id = Number(params['id']);

        return this.productService
          .getProducts()
          .pipe(map((products) => products.find((p) => p.id === id)));
      }),
    );
  }

  //Add Product To Cart
  addToCart(product: Product) {
    this.cartService.addToCart(product, this.quantity);
    this.quantity = 1;
  }
}
