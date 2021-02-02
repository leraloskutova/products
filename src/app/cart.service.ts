import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject([]);
  products = [];

  constructor() {
    this.fillCart();
  }
  /**
   * Проверка на наличие продуктов в корзине.
   */
  fillCart() {
    if (!localStorage.getItem('cart')) {
      return;
    }

    var cart = JSON.parse(localStorage.getItem('cart'));
    this.products = cart;
    this.cart.next(this.products );
    return this.cart;
  }
  /**
   * Добавление продукта в корзину.
   */
  addToCart(product): void {
    this.products.push(product);
    this.cart.next(this.products);
    this.setToLocalStorage(product);
  }
  /**
   * Хранение списка продуктов в корзине между сессиями.
   */
  private setToLocalStorage(product?): void {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    } else {
      localStorage.setItem('cart', JSON.stringify(this.products));
      this.cart.next(JSON.parse(localStorage.getItem('cart')));
    }
    if (!product) {
      return;
    }
  }
  /**
   * Очищение корзины.
   */
  clearCart() {
    this.products = [];
    return this.products;
  }
  /**
   * Удаление одного продукта в корзине.
   */
  // removeFromLocalstorage(id) {
  //   var cart = JSON.parse(localStorage.getItem('cart'));
  //   var index = cart.findIndex(x => x.id == id);
  //
  //   cart.splice(index, 1); // удаляем с локалсторедж
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // }
}
