import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiURL } from '../consts';
import { Observable } from 'rxjs';
import { Product, Products } from '../interface';
import { SingleProduct } from '../interface/singleProduct';

@Injectable({
  providedIn: 'root'
})
export class SingleProductService {
  private readonly http = inject(HttpClient)

  private readonly productURL = apiURL

  loadProduct(_id: string): Observable<Product>{
    return this.http.get<Product>(`${this.productURL}/shop/products/id/${_id}`)
  }
}
