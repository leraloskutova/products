import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Page} from './page';
import {Product} from './product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * Класс для работы с запросами.
 */
export class HttpService{
  private url = 'https://fakestoreapi.herokuapp.com/products';
  /**
   * Конструктор класса HttpService.
   */
  constructor(private http: HttpClient){ }
  /**
   * Запрос на получение списка продуктов.
   */
  getProducts(page: number, itemsPerPage: number): Observable<Page> {
    const products = this.http.get<any[]>(this.url);
    window.scrollTo(0, 0);
    if (localStorage.getItem('itemsPerPage')) {
      itemsPerPage = Number(localStorage.getItem('itemsPerPage'));
    }
    if (localStorage.getItem('page')) {
      page = Number(localStorage.getItem('page'));
    }
    return this.getPageItems(products, page, itemsPerPage);
  }
  private getPageItems(products: Observable<Array<any>>, page: number, itemsPerPage: number): Observable<Page> {
    return products.pipe(
      map(u => {
        const startIndex = itemsPerPage * (page - 1);
        return new Page(u.length, u.slice(startIndex, startIndex + itemsPerPage));
      })
    );
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + id);
  }
}
