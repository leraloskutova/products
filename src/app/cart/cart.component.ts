import {Component, OnInit, OnDestroy} from '@angular/core';
import {CartService} from '../cart.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Product} from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit, OnDestroy {
  cartList: any;
  count?: number;

  private unsubscribe = new Subject();

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCartList();
  }
  ngOnDestroy(): void {
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
          this.cartList = data;
        });
    this.count = this.cartService.getCount();
    if (this.count === 0) {
      // @ts-ignore
      document.getElementById('title-cart').innerHTML = '';
      // @ts-ignore
      document.getElementById('btn-clear').setAttribute('disabled', 'disabled');
      // @ts-ignore
      document.getElementById('img-empty').style.visibility = 'visible';
    } else {
      // @ts-ignore
      document.getElementById('total-price').style.visibility = 'visible';
    }
  }
  /**
   * Очищение корзины.
   */
  clearCart(): void {
    if (window.confirm('Do you really want to clear the cart?')) {
      localStorage.removeItem('cart');
      this.cartService.clearCart();
      window.location.reload();
    }
  }
  /**
   * Удаление одного продукта из корзины.
   */
  deleteCartProduct(productId: number): void {
    if (window.confirm('Do you really want to delete the product?')) {
      window.location.reload();
      this.cartService.removeFromLocalstorage(productId);
    }
  }
  /**
   * Изменение количества продуктов в корзине.
   */
  changeQuantity(product: Product): void {
    this.cartService.changeQuantity(product);
  }
  /**
   * Подсчет общей стоимости продуктов в корзине.
   */
  get total(): number {
    return this.cartList.reduce((sum: any, x: { totalPrice: any; }) => sum + x.totalPrice, 0);
  }
}
