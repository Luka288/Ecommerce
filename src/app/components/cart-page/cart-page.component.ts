import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { UserCart } from '../../shared/interface/cart';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export default class CartPageComponent implements OnInit {
  private readonly cart = inject(CartService)

  display: UserCart | null = null;


  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    this.cart.getCart()?.subscribe((res) => {
      this.display = res
    })
  }

}
