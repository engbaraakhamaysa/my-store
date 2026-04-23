import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartService';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';

import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.css'],
})
export class ProductItem {
  @Output() notify = new EventEmitter<string>();

  @Input() product!: Product;

  quantity: number = 1;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  addToCart() {
    this.cartService.addToCart(this.product, this.quantity);

    this.notify.emit(this.product.name);

    this.quantity = 1;
  }

  goToDetails() {
    this.router.navigate(['/product', this.product.id]);
  }
}
