import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartService.js';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartItems: any[] = [];

  name: string = '';
  address: string = '';
  cardNumber: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  submitOrder() {
    const total = this.cartService.getTotal();
    this.cartItems = [];
    this.cartService.cart = [];
    this.router.navigate(['/confirmation'], {
      state: {
        name: this.name,
        total: total,
      },
    });
  }
}
