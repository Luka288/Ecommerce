import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { UserCart } from '../../shared/interface/cart';
import { SingleProduct } from '../../shared/interface/singleProduct';
import { SingleProductService } from '../../shared/services/single-product.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export default class CartPageComponent implements OnInit {
  private readonly cart = inject(CartService)
  private readonly singleProductService = inject(SingleProductService)

  forImg: SingleProduct | null = null;
  display: UserCart | null = null;
  productThumbnails: { [key: string]: string } = {};


  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.cart.getCart()?.subscribe((res) => {
      this.display = res;
      if (this.display?.products.length) {
        this.display.products.forEach(product => {
          this.getImg(product.productId);
        });
      }
    });
  }

  getImg(productId: string) {
    this.singleProductService.loadProduct(productId).subscribe((res) => {
      this.productThumbnails[productId] = res.thumbnail;
    });
  }

}
