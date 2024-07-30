import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable()


  addProduct(product: Product){
    const current = this.productsSubject.value
    this.productsSubject.next([...current, product])
  }

  getProduct(){
    return this.productsSubject.value
  }

}
