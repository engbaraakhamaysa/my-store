import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartService';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart implements OnInit {
  cartItems: { product: Product; quantity: number }[] = [];

  name: string = '';
  address: string = '';
  cardNumber: string = '';

  nameError: string = '';
  addressError: string = '';
  cardError: string = '';

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

  validateName(value: string) {
    if (!value) {
      this.nameError = 'Name is required';
    } else if (value.length < 3) {
      this.nameError = 'Name must be at least 3 characters';
    } else {
      this.nameError = '';
    }
  }

  validateAddress(value: string) {
    if (!value) {
      this.addressError = 'Address is required';
    } else if (value.length < 5) {
      this.addressError = 'Address must be at least 5 characters';
    } else {
      this.addressError = '';
    }
  }

  validateCard(value: string) {
    const onlyNumbers = /^[0-9]+$/;

    if (!value) {
      this.cardError = 'Card number is required';
    } else if (!onlyNumbers.test(value)) {
      this.cardError = 'Card number must contain only numbers';
    } else if (value.length < 5) {
      this.cardError = 'Card number must be at least 5 digits';
    } else {
      this.cardError = '';
    }
  }

  submitOrder() {
    const total = this.getTotal();

    this.cartService.clearCart();
    this.cartItems = [];

    this.router.navigate(['/confirmation'], {
      state: {
        name: this.name,
        total: total,
      },
    });
  }

  remove(id: number) {
    this.cartService.removeFromCart(id);
    this.cartItems = this.cartService.getCart();
    alert('Product removed from cart ❌');
  }
}
