import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Product} from './product';

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
   * Проверка на наличие продуктов в корзине и их вывод.
   */
  fillCart(): any {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') as string);
    this.products = cart;
    this.cart.next(this.products);
    return this.cart;
  }
  /**
   * Добавление продукта в корзину.
   */
  addToCart(product: Product): void {
    product.quantity = 1;
    product.totalPrice = product.price;
    const cart = JSON.parse(localStorage.getItem('cart') as string);
    this.products = cart;
    if (cart.length) {
      let count = 0;
      for (const value of cart) {
        if (product.id === value.id){
          value.quantity += 1;
          this.cart.next(this.products);
          this.setToLocalStorage(product);
        } else {
          count += 1;
        }
      }
      if (count === cart.length) {
        cart.push(product);
        this.cart.next(this.products);
        this.setToLocalStorage(product);
      }
    } else {
      cart.push(product);
      this.cart.next(this.products);
      this.setToLocalStorage(product);
    }
  }
  /**
   * Хранение списка продуктов в корзине между сессиями.
   */
  private setToLocalStorage(product: Product): void {
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
    return this.products.reduce((sum: any, x: { quantity: any; }) => sum + x.quantity, 0);
  }
  /**
   * Очищение корзины.
   */
  clearCart(): any[] {
    this.products = [];
    return this.products;
  }
  /**
   * Удаление одного продукта из корзины.
   */
  removeFromLocalstorage(id: number): void {
    const cart = JSON.parse(localStorage.getItem('cart') as string);
    const index = cart.findIndex((x: { id: any; }) => x.id === id);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  /**
   * Изменение количества продуктов в корзине.
   */
  changeQuantity(product: Product): any {
    // @ts-ignore
    product.totalPrice = product.price * product.quantity;
    localStorage.setItem('cart', JSON.stringify(this.products));
    return this.cart;
  }
}
