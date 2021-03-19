// It's a good practice to follow a specific order in imports.
// For example it's quite common to sort imports in such manner:
//    1. Angular Imports
//    2. Library Imports
//    3. Common parts of the project
//    4. Relative imports sorted by level of hierarchy

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { ProductListItem, ProductDetailedItem } from 'src/app/common/interfaces/api/product.interface'; // Absolute naming since it's the common module

import {Page} from './page';


@Injectable({
  providedIn: 'root'
})
/**
 * Класс для работы с запросами.
 */
export class HttpService{
  // You labeled that class as a class form working with HTTP requests but
  // in fact it's working only with product. Consider renaming and narrowing the scope
  private url = 'https://fakestoreapi.herokuapp.com/products';
  /**
   * Конструктор класса HttpService.
   */
  constructor(
      private http: HttpClient,
  ) { }
  /**
   * Запрос на получение списка продуктов.
   */
  //  It is not critical but I like when every method has private/public prefix
  //  ========
  //  page is way broad name, thanks to typing we can make an assumtion about what it does
  //  but it's better to rename it to something like pageNumber
  public getProducts(page: number, itemsPerPage: number): Observable<Page> { // Function is called "getProducts" but why it returns Page?

    // Using "any" is the last resort. For every request we have to create an interface
    // otherwise we don't know what to expect from the endpoint
    const products = this.http.get<ProductListItem[]>(this.url)
      .pipe(
          // Replacing image URL for products since the API seems to be kind of fucked up
          map((productItems: ProductListItem[]) => productItems.map(
              (productItem: any) => ({
                  ...productItem,
                  image: productItem.image.replace('.com', '.herokuapp.com'),
              })
          ))
      );

    window.scrollTo(0, 0); // Should be smooth scroll and it shouldn't be there, it's a side effect

    // This is clearly a side effect. When I call a function with the name "getProducts"
    // that accepts pageNumber and itemsPerPage I assume that it will return itemsPerPage items
    // at pageNumberPage but it overrides my values and gives a result that breaks my assumptions.
    // Working with the localStorage is outside of the scope of that function, it should be performed on a
    // higher level
    if (localStorage.getItem('itemsPerPage')) {
      // No need of use "Number" literal. If you want to perform
      // type conversion to number, placing a "+" sign upfront is enough
      itemsPerPage = Number(localStorage.getItem('itemsPerPage'));
    }

    if (localStorage.getItem('page')) {
      // Same applies here as well
      page = Number(localStorage.getItem('page'));
    }

    // Data conversion should be on a higer level since it breaks the scope of the current function
    return this.getPageItems(products, page, itemsPerPage);
  }
  
  // Do not mix private and public functions
  public getProduct(id: number): Observable<ProductDetailedItem> {
    return this.http.get<ProductDetailedItem>(this.url + '/' + id)
      .pipe(
        map((product: ProductDetailedItem) => ({
            ...product,
            image: product.image.replace('.com', '.herokuapp.com'),
        }))
      );
  }

  // One empty line between function declarations
  // ==========
  // Array is too verbose, TS has a shourtcut for this task
  private getPageItems(products: Observable<ProductListItem[]>, page: number, itemsPerPage: number): Observable<Page> { // Do not use any! Make a proper interface
    return products.pipe(
      map((products: ProductListItem[]) => { // Variable without a meaningful name and type
        const startIndex = itemsPerPage * (page - 1);
        return new Page(products.length, products.slice(startIndex, startIndex + itemsPerPage));
      })
    );
  }
}
