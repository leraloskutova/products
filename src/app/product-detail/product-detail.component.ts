import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { HttpService } from '../http.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
  // product: any;
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.httpService.getProduct(id)
      .subscribe(product => this.product = product);
  }
  addToCart(product) {
    window.alert('Your product has been added to the cart!');
    this.cartService.addToCart(product);
  }
}
