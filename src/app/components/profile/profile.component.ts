import { Component, inject, OnInit } from '@angular/core';
import { UserInfoService } from '../../shared/services/user-info.service';
import { catchError, tap } from 'rxjs';
import { User } from '../../shared/interface/user';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../shared/services/wishlist.service';
import { Product } from '../../shared';
import { CartService } from '../../shared/services/cart.service';
import { UserCart } from '../../shared/interface/cart';
import { AuthService } from '../../shared/services/auth.service';
import { SweetAlertService } from '../../shared/services/sweet-alert.service';
import AuthPageComponent from '../auth-page/auth-page.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export default class ProfileComponent implements OnInit {
  private readonly userInfo = inject(UserInfoService)
  private readonly wishlist = inject(WishlistService)
  private readonly cart = inject(CartService)
  private readonly alert = inject(SweetAlertService)

  profileInfo: User | null = null;
  items: Product[] = []
  cartItems: UserCart | null = null;
  checkVerify: boolean = false;



  ngOnInit(): void {
    this.loadUser()
    this.getWishlist()
    // this.getCartItems()
  }


  getWishlist(){
    this.wishlist.savedItem$.pipe(tap(res => {
      this.items = res
    })).subscribe()
  }

  getCartItems(){
    this.cart.getCart()?.pipe(tap(res => {
      console.log(res)
      this.cartItems = res
    })).subscribe()
  }

  loadUser(): void{
    this.userInfo.getUser().pipe(tap(res => {
      //user verified
      this.checkVerify = true
      this.profileInfo = res
    }),
    catchError(err => {
      console.error('Error loading user:', err.error.error);
      if(err.error.error === 'User needs to verify email'){
        //user unverified
    console.log(this.checkVerify)        
      }
      return 'false'; 
    })
  ).subscribe()
  }

}
