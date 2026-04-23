import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartService.js';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model.js';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  @Input() product: any;

  quantity: number = 1;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  addToCart() {
    this.cartService.addToCart(this.product, this.quantity);
    alert('The product has been added to the cart ✅');
    this.quantity = 1;
  }

  goToDetails() {
    this.router.navigate(['/product', this.product.id]);
  }
}
