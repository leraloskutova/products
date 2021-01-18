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
  selectedProduct: Product = new Product();
  onSelect(product: Product): void {
    this.selectedProduct = product;
  }
  /**
   * Конструктор класса AppComponent.
   */
  constructor(private httpService: HttpService){}
  /**
   * Получение списка продуктов.
   */
  ngOnInit(): void{
    this.httpService.getData()
      .subscribe(products => this.products = products);
  }
}
