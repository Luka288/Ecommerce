import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiURL } from '../consts';
import { LocalStorageKeys } from '../enums';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private readonly http = inject(HttpClient)

  readonly url = apiURL



  getUser(){
    const token = localStorage.getItem(LocalStorageKeys.AccessToken)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  
    return this.http.get<User>(`${this.url}/auth`, {headers})
  }

}
