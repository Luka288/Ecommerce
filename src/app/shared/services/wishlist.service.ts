import { ChangeDetectionStrategy, ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, Products } from '../interface';
import { SingleProduct } from '../interface/singleProduct';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  private readonly _savedItem$ = new BehaviorSubject<SingleProduct[]>([]);
  readonly savedItem$ = this._savedItem$.asObservable()

  constructor(){
    const getFromLocal = localStorage.getItem('Product')

    if(getFromLocal){
      this._savedItem$.next(JSON.parse(getFromLocal))
    }

  }


  get savedItem(): SingleProduct[] {
    return this._savedItem$.getValue()
  }
  
  set savedItem(products: SingleProduct[]){
    if(products){
      localStorage.setItem('Product', JSON.stringify(products))
    }else{
      localStorage.removeItem('Product')
    }
    this._savedItem$.next(products);
  }


  getWishlist(product: SingleProduct){
    const currentWishlist = this.savedItem;

    let isAlreadyInWishlist = false;

    for(const item of currentWishlist){
      if(item._id === product._id){
        isAlreadyInWishlist = true;
        break
      }
    }


    if (!isAlreadyInWishlist) {
      this.savedItem = [...currentWishlist, product];
    }
  }

  removeItem(index: number){
    this.savedItem.splice(index, 1)
    this.savedItem = [...this.savedItem]
  }
}
