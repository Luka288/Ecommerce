import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../shared/services/wishlist.service';
import { CommonModule } from '@angular/common';
import { Product, ProductsService } from '../../shared';
import { take, tap } from 'rxjs';
import { SweetAlertService } from '../../shared/services/sweet-alert.service';
import { SingleProductService } from '../../shared/services/single-product.service';
import { SingleProduct } from '../../shared/interface/singleProduct';

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


  ngOnInit(): void {
    this.loadFromStream()
  }

  listenStream: SingleProduct[] = [];
  displayItems: SingleProduct[] = [];

  loadFromStream(){
    this.wishlist.savedItem$.pipe(tap((res)=>{
      if (res) {
        this.listenStream = res;
        console.log(this.listenStream);
        res.forEach(product => this.loadProduct(product._id))
      }
    })).subscribe()
  }

  removeWishlisted(index: number){
    this.wishlist.removeItem(index)
    this.alert.toast('Item removed', 'success', 'green')
  }


  loadProduct(id: string){
    this.productService.loadProduct(id).pipe(tap(res => {
      console.log(res)
      this.displayItems.push(res)
    })).subscribe()
  }

}
