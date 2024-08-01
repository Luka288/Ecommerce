import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthInterface } from '../interface/auth';
import { apiURL } from '..';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient)

  private readonly authAPI = apiURL

  register(user: AuthInterface){
    return this.http.post<AuthInterface>(`${this.authAPI}/auth/sign_up`, user)
  }

  //auth page dan gadecema USER parametrit inputebis value validatorebidan
}
