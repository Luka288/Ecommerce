import { inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interface';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../consts';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // private productsSubject = new BehaviorSubject<Product[]>([]);
  // products$ = this.productsSubject.asObservable()


  // addProduct(product: Product){
  //   const current = this.productsSubject.value
  //   this.productsSubject.next([...current, product])
  // }

  // getProduct(){
  //   return this.productsSubject.value
  // }

  private readonly http = inject(HttpClient)
  private readonly auth = inject(AuthService)


  private readonly url = apiURL


  createCart(id: string, quantity: number){
    const token = this.auth.accessToken
    if(token){
      const headers  = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
      return this.http.post(`${this.url}/shop/cart/product`, {id, quantity}, { headers })
    }else{
      console.log('error')
      return null;
    }
  }

  getCart(){
    const token = this.auth.accessToken
    if(token){
      const headers = new HttpHeaders({ 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })  
      return this.http.get(`${this.url}/shop/cart`, {headers})
    }else{
      return null;
    }
    
  }

  clearCart(){
    const token = this.auth.accessToken
    if(token){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
      return this.http.delete(`${this.url}/shop/cart`, {headers})
    }
    return null;
  }

}
