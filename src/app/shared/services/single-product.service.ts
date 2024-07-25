import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiURL } from '../consts';

@Injectable({
  providedIn: 'root'
})
export class SingleProductService {
  private readonly http = inject(HttpClient)

  private readonly productURL = apiURL

  loadProduct(_id: string){
    return this.http.get<SingleProductService>(`${this.productURL}/shop/products/id/${_id}`)
  }
}
