import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject([]);
  products = [];
  count?: number;

  constructor() {
    this.fillCart();
  }
  /**
   * Проверка на наличие продуктов в корзине и их вывод.
   */
  // tslint:disable-next-line:typedef
  fillCart() {
    if (!localStorage.getItem('cart')) {
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') as string);
    this.products = cart;
    this.cart.next(this.products );
    return this.cart;
  }
  /**
   * Добавление продукта в корзину.
   */
  addToCart(product: any): void {
    // @ts-ignore
    this.products.push(product);
    this.cart.next(this.products);
    this.setToLocalStorage(product);
  }
  /**
   * Хранение списка продуктов в корзине между сессиями.
   */
  private setToLocalStorage(product?: any): void {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    } else {
      localStorage.setItem('cart', JSON.stringify(this.products));
      this.cart.next(JSON.parse(localStorage.getItem('cart') as string));
    }
    if (!product) {
      return;
    }
  }
  /**
   * Подсчет количества продуктов в корзине.
   */
  getCount(): number {
    this.count = this.products.length;
    return this.count;
  }
  /**
   * Очищение корзины.
   */
  clearCart(): any[] {
    this.products = [];
    return this.products;
  }
  /**
   * Удаление одного продукта в корзине.
   */
  // tslint:disable-next-line:typedef
  removeFromLocalstorage(id: number) {
    const cart = JSON.parse(localStorage.getItem('cart') as string);
    const index = cart.findIndex((x: { id: any; }) => x.id === id);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
