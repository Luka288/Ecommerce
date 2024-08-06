import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, Products } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  private readonly _savedItem$ = new BehaviorSubject<Product | null>(null);
  readonly savedItem$ = this._savedItem$.asObservable()

  constructor(){

    const getFromLocal = localStorage.getItem('Product')

    if(getFromLocal){
      this._savedItem$.next(JSON.parse(getFromLocal))
    }

  }


  get savedItem(): Product | null{
    return this._savedItem$.getValue()
  }
  
  set savedItem(product: Product | null){
    if(product){
      localStorage.setItem('Product', JSON.stringify(product))
    }else{
      localStorage.removeItem('Product')
    }
    this._savedItem$.next(product)
  }


  getWishlist(product: Product){
    this.savedItem = product
  }

  clearWishlist(){
    this.savedItem = null;
  }
}
