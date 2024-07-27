import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiURL } from '../consts';
import { Products } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly http = inject(HttpClient)

  private readonly url = apiURL

  getCategories(catergory: number, page_index: number, pageSize: number){
    return this.http.get<Products>(`${this.url}/shop/products/category/${catergory}?page_index=${page_index}&page_size=${pageSize}`)
  }

}
