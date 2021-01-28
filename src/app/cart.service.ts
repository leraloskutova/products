import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products = [];
  addToCart(product): void {
    this.products.push(product);
  }
  getProducts() {
    return this.products;
  }
  clearCart() {
    this.products = [];
    return this.products;
  }
  constructor() {}

}
