import {Component, OnInit} from '@angular/core';
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
  title = 'Products';
  products: Product[] = [];
  public page: number;
  // @ts-ignore
  public collectionSize: number;
  public itemsPerPage = 5;
  // @ts-ignore
  public selectedItem: number;
  /**
   * Конструктор класса ProductsComponent.
   */
  constructor(private httpService: HttpService){
    this.page = 1;
    this.getProducts();
  }
  ngOnInit(): void {
  }
  onPageChanged(): void {
    localStorage.setItem('page', String(this.page));
    this.getProducts();
  }
  /**
   * Получение списка продуктов.
   */
  getProducts(): void {
    if (localStorage.getItem('itemsPerPage')) {
      this.itemsPerPage = Number(localStorage.getItem('itemsPerPage'));
    }
    this.httpService.getProducts(this.page, this.itemsPerPage)
      .subscribe(p => {
        this.products = p.rows;
        this.collectionSize = p.totalCount;
      });
  }
  /**
   * Изменение размера страницы.
   */
  changeSize(selectedItem: number): void {
    this.itemsPerPage = selectedItem;
    localStorage.setItem('itemsPerPage', String(this.itemsPerPage));
    localStorage.setItem('page', String(1));
    window.location.reload();
  }
}
