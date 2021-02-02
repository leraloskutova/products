import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {
  cartList;
  count;
  // productIndex: number;
  // id: number;

  private unsubscribe = new Subject();

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCartList();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  /**
   * Получение списка продуктов в корзине.
   */
  getCartList(): void {
    this.cartService.cart.pipe(takeUntil(this.unsubscribe))
      .subscribe(
        data => {
          console.log(data);
          this.cartList = data;
        });
    this.checkCart();
    this.count = this.cartList.length;
  }
  /**
   * Проверка на наличие продуктов в корзине.
   */
  checkCart(): void {
    if (!localStorage.getItem('cart')) {
      document.getElementById('title-cart').innerHTML = 'Your cart is empty!';
    }
  }
  /**
   * Очищение корзины.
   */
  clearCart(): void {
    window.alert('Your cart has been cleared!');
    localStorage.clear();
    this.cartService.clearCart();
    window.location.reload();
  }
  /**
   * Удаление одного продукта в корзине.
   */
  // deleteCartItem(productId: number) {
  //   this.cartService.removeFromLocalstorage(productId);
  //
  //   var index = this.product.findIndex(x => x.id == productId);
  //   this.product.splice(index, 1); // удаляем с this.product тоже
  // }
}
