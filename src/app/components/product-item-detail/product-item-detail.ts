import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/productService';
import { CartService } from '../../services/cartService';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-item-detail.html',
  styleUrls: ['./product-item-detail.css'],
})
export class ProductItemDetail {
  quantity: number = 1;
  product$: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService,
  ) {
    //Get Product ID from route and load product details
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product$ = this.productService.getProductById(id);
  }

  //Ad Product To Cart & Massege Success Toaster
  addToCart(product: Product) {
    this.cartService.addToCart(product, this.quantity);
    this.toastr.success(`Product added`, 'Success');

    this.quantity = 1;
  }
}
