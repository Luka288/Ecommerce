import { ChangeDetectionStrategy, ChangeDetectorRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, Products } from '../interface';
import { SweetAlertService } from './sweet-alert.service';
import { AuthService } from './auth.service';
import { LocalStorageKeys } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly alert = inject(SweetAlertService)
  private readonly auth = inject(AuthService)


  private readonly _savedItem$ = new BehaviorSubject<Product[]>([]);
  readonly savedItem$ = this._savedItem$.asObservable()

  constructor(){
    const getFromLocal = localStorage.getItem('Product')

    if(getFromLocal){
      this._savedItem$.next(JSON.parse(getFromLocal))
    }

  }

  readonly checkToken$ = this.auth.refreshToken


  get savedItem(): Product[] {
    return this._savedItem$.getValue()
  }
  
  set savedItem(products: Product[]){
    if(products){
      localStorage.setItem('Product', JSON.stringify(products))
    }else{
      localStorage.removeItem('Product')
    }
    this._savedItem$.next(products);
  }


  getWishlist(product: Product){
    const token = localStorage.getItem(LocalStorageKeys.AccessToken)
    if(!token){
      this.alert.toast("Sign up to access all features.", 'error', 'red ')
      return
    }
    const currentWishlist = this.savedItem;

    let isAlreadyInWishlist = false;

    for(const item of currentWishlist){
      if(item._id === product._id){
        isAlreadyInWishlist = true;
        this.alert.toast('Item is already in wishlsit', 'error', 'red')
        return
      }
    }
    this.alert.toast('Item added', 'success', 'green')
    if (!isAlreadyInWishlist) {
      this.savedItem = [...currentWishlist, product];
    }

  }

  removeItem(index: number){
    this.savedItem.splice(index, 1)
    this.savedItem = [...this.savedItem]
  }
}
