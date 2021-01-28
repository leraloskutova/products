import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Product } from '../product';

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
  title = 'Products';
  products: Product[] = [];
  public page: number;
  // @ts-ignore
  public collectionSize: number;
  public itemsPerPage = 5;
  /**
   * Конструктор класса AppComponent.
   */
  constructor(private httpService: HttpService){
    this.page = 1;
    this.getProducts();
  }
  ngOnInit(): void {
  }
  onPageChanged(): void {
    this.getProducts();
  }
  /**
   * Получение списка продуктов.
   */
  getProducts(): void {
    this.httpService.getProducts(this.page, this.itemsPerPage)
      .subscribe(p => {
        this.products = p.rows;
        this.collectionSize = p.totalCount;
      });
  }
}
