import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiURL } from '../consts';
import { Observable } from 'rxjs';
import { Product, Products } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly http = inject(HttpClient)

  private readonly everestPRODUCTS = apiURL;

  getProducts(page_index: number, page_size: number): Observable<Products>{
    return this.http.get<Products>(`${this.everestPRODUCTS}/shop/products/all?page_index=${page_index}&page_size=${page_size}`)
  }

}
