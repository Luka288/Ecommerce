import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../shared/services/wishlist.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared';
import { catchError, take, tap } from 'rxjs';
import { SweetAlertService } from '../../shared/services/sweet-alert.service';
import { SingleProductService } from '../../shared/services/single-product.service';
import { CartService } from '../../shared/services/cart.service';
import { flush } from '@angular/core/testing';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.scss'
})
export default class WishlistPageComponent implements OnInit {
  private readonly wishlist = inject(WishlistService)
  private readonly alert = inject(SweetAlertService)
  private readonly productService = inject(SingleProductService)
  private readonly cartService = inject(CartService)


  // readonly listenStream = this.wishlist.savedItem

  ngOnInit(): void {
    this.loadFromStream()
  }

  listenStream: Product[] = [];

  loadFromStream(){
    this.wishlist.savedItem$.pipe(tap((res)=>{
      if (res) {
        this.listenStream = res;
        console.log(this.listenStream);
        res.forEach(product => this.loadProduct(product._id));
      }
    })).subscribe()
  }

  removeWishlisted(index: number){
    this.wishlist.removeItem(index)
    this.alert.toast('Item removed', 'success', 'green')
  }


  loadProduct(id: string){
    this.productService.loadProduct(id).pipe(tap((res) => {
    })
    )
  }

  moveToCart(product: Product){
    if(product.stock == 0){
      this.alert.toast("We're currently out of stock on this product.", 'error', 'red')
      return
    }
    if(this.cartService.isCartCreated == false){
      this.cartService.updateCart(product._id)?.pipe(tap(res => {
        console.log(res)
      })).subscribe()
    }else{
      this.cartService.createCart(product._id, 1)?.pipe(tap(res => {
        console.log(res)
        if(product.stock === 0){
          this.alert.toast("We're currently out of stock on this product.", 'error', 'red')
        }
      })).subscribe()
    }
  }
}
