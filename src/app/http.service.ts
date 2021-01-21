import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from './product';

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
  getProducts(): Observable<Product[]> {
    // @ts-ignore
    return this.http.get(this.url);
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get(`https://fakestoreapi.com/products/${id}`);
  }
}
