import {Component, OnInit} from '@angular/core';
import {HttpService} from './http.service';
import {Product} from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpService]
})
/**
 * Класс компоненты приложения.
 */
export class AppComponent implements OnInit{
  products: Product[] = [];
  /**
   * Конструктор класса AppComponent.
   */
  constructor(private httpService: HttpService){}
  /**
   * Получение списка продуктов.
   */
  ngOnInit(): void{
    this.httpService.getData().subscribe(
      data => this.products = (data));
  }
}
