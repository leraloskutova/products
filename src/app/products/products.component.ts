import {Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {Product} from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [HttpService]
})
/**
 * Класс компоненты приложения.
 */
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  /**
   * Конструктор класса AppComponent.
   */
  constructor(private httpService: HttpService){}
  ngOnInit(): void {
    this.getProducts();
  }
  /**
   * Получение списка продуктов.
   */
  getProducts(): void {
    this.httpService.getProducts()
      .subscribe(products => this.products = products);
  }
}
