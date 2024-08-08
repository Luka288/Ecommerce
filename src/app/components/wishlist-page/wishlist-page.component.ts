import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../shared/services/wishlist.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared';
import { take, tap } from 'rxjs';
import { SweetAlertService } from '../../shared/services/sweet-alert.service';

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
      }
    })).subscribe()
  }

  removeWishlisted(index: number){
    this.wishlist.removeItem(index)
    this.alert.toast('Item removed', 'success', 'green')
  }

}
