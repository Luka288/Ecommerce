import { inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interface';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../consts';
import { AuthService } from './auth.service';
import { SweetAlertService } from './sweet-alert.service';
import { UserCart } from '../interface/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient)
  private readonly auth = inject(AuthService)
  private readonly alert = inject(SweetAlertService)


  private readonly url = apiURL


  createCart(id: string, quantity: number){
    const token = this.auth.refreshToken
    if(token){
      const headers  = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
      this.alert.toast('Added to cart', 'success', 'green')
      return this.http.post<UserCart>(`${this.url}/shop/cart/product`, {id, quantity}, { headers })
    }else{
      console.log('error')
      return null;
    }
  }

  getCart(){
    const token = this.auth.refreshToken
    if(token){
      const headers = new HttpHeaders({ 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })  
      return this.http.get(`${this.url}/shop/cart`, { headers })
    }else{
      return null;
    }
    
  }

  updateCart(id: string, quantity: number){
    const token = this.auth.refreshToken

    if(token){
      const headers = new HttpHeaders({
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
      return this.http.patch(`${this.url}/shop/cart/product`, {id, quantity}, {headers})
    }else{
      return null;
    }
  }

  clearCart(){
    const token = this.auth.refreshToken
    if(token){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
      this.alert.toast('Items has been removed', 'success', 'green')
      return this.http.delete(`${this.url}/shop/cart`, { headers })
    }
    return null;
  }

}
