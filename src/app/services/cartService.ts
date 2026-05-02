import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: { product: Product; quantity: number }[] = [];

  constructor() {}

  // Add Product To Cart
  addToCart(product: Product, quantity: number = 1) {
    quantity = Number(quantity);

    const existingItem = this.cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
  }

  // Get All Products in Cart
  getCart() {
    return [...this.cart];
  }

  // Get Total Price
  getTotal() {
    return this.cart
      .reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0)
      .toFixed(2);
  }
  clearCart() {
    this.cart = [];
  }
  //Remove Product
  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.product.id !== productId);
  }
}
