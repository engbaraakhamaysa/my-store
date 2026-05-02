import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartService';
import { Product } from '../../models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart implements OnInit {
  // items in the cart (product + quantity)
  cartItems: { product: Product; quantity: number }[] = [];

  // form inputs
  name: string = '';
  address: string = '';
  cardNumber: string = '';

  // error messages for validation
  nameError: string = '';
  addressError: string = '';
  cardError: string = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  // validate user name input
  validateName(value: string) {
    if (!value) {
      this.nameError = 'Name is required';
    } else if (value.length < 3) {
      this.nameError = 'Name must be at least 3 characters';
    } else {
      this.nameError = '';
    }
  }

  // validate address input
  validateAddress(value: string) {
    if (!value) {
      this.addressError = 'Address is required';
    } else if (value.length < 5) {
      this.addressError = 'Address must be at least 5 characters';
    } else {
      this.addressError = '';
    }
  }

  // validate card number input
  validateCard(value: string) {
    if (!value) {
      this.cardError = 'Card number is required';
    } else if (value.length < 5) {
      this.cardError = 'Card number must be at least 5 digits';
    } else {
      this.cardError = '';
    }
  }

  // load cart items when component starts
  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  // calculate total price of cart
  getTotal() {
    return this.cartService.getTotal();
  }

  // submit order and navigate to confirmation page
  submitOrder() {
    if (this.cartItems.length === 0) {
      this.toastr.error('Cart is empty', 'Error');
      return;
    }

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

  // remove product from cart
  remove(id: number) {
    this.cartService.removeFromCart(id);
    this.cartItems = this.cartService.getCart();

    this.toastr.error('Product removed from cart', 'Removed');
  }
}
