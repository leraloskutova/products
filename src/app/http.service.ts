import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Page} from './page';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
/**
 * Класс для работы с запросами.
 */
export class HttpService{
  private url = 'https://fakestoreapi.com/products';
  /**
   * Конструктор класса HttpService.
   */
  constructor(private http: HttpClient){ }
  /**
   * Запрос на получение списка продуктов.
   * @return {Object} person
   */
  getProducts(page: number, itemsPerPage: number): Observable<Page> {
    let products = this.http.get<any[]>(this.url);
    return this.getPageItems(products, page, itemsPerPage);
  }
  private getPageItems(products: Observable<Array<any>>, page: number, itemsPerPage: number): Observable<Page> {
    return products.pipe(
      map(u => {
        let startIndex = itemsPerPage * (page - 1);
        return new Page(u.length, u.slice(startIndex, startIndex + itemsPerPage));
      })
    );
  }
  getProduct(id: number): Observable<Array<any>> {
    return this.http.get<any[]>(`https://fakestoreapi.com/products/${id}`);
  }
}
