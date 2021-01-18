import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
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
  // tslint:disable-next-line:typedef
  getData() {
    return this.http.get(this.url);
  }
}
