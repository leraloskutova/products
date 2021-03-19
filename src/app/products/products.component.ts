import {Component, OnInit} from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ProductListItem } from '../common/interfaces/api/product.interface';
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
  public title = 'Products';
  public totalCount: number = 0;

  public page = new BehaviorSubject<number>(
      +(localStorage.getItem('page') || 1)
  )
  public itemsPerPage = new BehaviorSubject<number>(5);

  public products: Observable<ProductListItem[]>
    = combineLatest([
      this.page,
      this.itemsPerPage,
    ]).pipe(
      switchMap<[number, number], Observable<ProductListItem[]>>(([page, itemsPerPage]) => 
        this.httpService.getProducts()
          .pipe(
            map<ProductListItem[], ProductListItem[]>(
                (products: ProductListItem[]) => {
                    this.totalCount = products.length;
                    
                    const startIndex = itemsPerPage * (page - 1)

                    return products.slice(
                        startIndex,
                        startIndex + itemsPerPage
                    );
                }
            )
          )
      )
    )

  /**
   * Конструктор класса ProductsComponent.
   */
  constructor(private httpService: HttpService){
  }

  public ngOnInit(): void {
  }

  public onPageChanged(page: number): void {
    localStorage.setItem('page', page.toString());

    this.page.next(page);
  }

  public changeSize(target: any): void {
    this.itemsPerPage.next(target.value);
  }
}
