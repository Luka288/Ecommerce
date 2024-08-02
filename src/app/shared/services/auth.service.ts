import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthInterface, user } from '../interface/auth';
import { apiURL } from '..';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, tap } from 'rxjs';
import { JwtTokens } from '../interface/tokens';
import { LocalStorageKeys } from '../enums';
import { SweetAlertService } from './sweet-alert.service';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { routes } from '../../app.routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient)
  private readonly alerts = inject(SweetAlertService)
  private readonly route = inject(Router)
  private readonly jwtHelperService = inject(JwtHelperService)

  private readonly authAPI = apiURL

  constructor(){
    this.init()
  }

  readonly #user$ = new BehaviorSubject<user | null>(null)
  readonly user$ = this.#user$.asObservable();


  get user(){
    return this.#user$.value
  }

  set user(user: user | null){
    this.#user$.next(user)
  }

  get accessToken(){
    return localStorage.getItem(LocalStorageKeys.AccessToken) || '';
  }

  set accessToken(token: string){
    localStorage.setItem(LocalStorageKeys.AccessToken, token)
  }

  get refreshToken(){
    return localStorage.getItem(LocalStorageKeys.RefreshToken) || '';
  }

  set refreshToken(refresh: string){
    localStorage.setItem(LocalStorageKeys.RefreshToken, refresh)
  }

  init(){
    if(this.accessToken && this.refreshToken) {
      this.user = this.jwtHelperService.decodeToken(this.accessToken)
    }
  }


  register(user: AuthInterface){
    return this.http.post<AuthInterface>(`${this.authAPI}/auth/sign_up`, user)
  }

  logIn(email: string, password: string){
    return this.http.post<JwtTokens>(`${this.authAPI}/auth/sign_in`, {email, password}).pipe(
       tap((token) => {
        this.accessToken = token.access_token
        this.refreshToken = token.refresh_token
        this.user = this.jwtHelperService.decodeToken(token.access_token)
      })
    )
  }

  logOut(){
    this.alerts.toast("Signed Out", "success", "green")
    localStorage.removeItem(LocalStorageKeys.AccessToken)
    localStorage.removeItem(LocalStorageKeys.RefreshToken) 
    this.route.navigateByUrl('')
    this.user = null

  }

  verifyEmail(email: string){
    return this.http.post(`${this.authAPI}/auth/verify_email`, email)
  }

  isUserAuth(){
    if(this.jwtHelperService.isTokenExpired(this.accessToken)){
      this.route.navigateByUrl('/auth')
      return false
    }
    return true
  }


  canUserAuth(){
    if(this.accessToken || this.refreshToken){
      this.route.navigateByUrl('')
      return false
    }else{
      return true
    }
  }

}
export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(AuthService).isUserAuth();
};


export const canUserAuth: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(AuthService).canUserAuth();
};