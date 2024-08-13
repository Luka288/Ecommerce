import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { SingleProductService } from '../../shared/services/single-product.service';
import { Product, Products } from '../../shared';
import { SingleProduct } from '../../shared/interface/singleProduct';
import { routes } from '../../app.routes';
import { AppComponent } from '../../app.component';
import { CartService } from '../../shared/services/cart.service';
import { NgxCubeLoaderComponent } from 'ngx-cube-loader';
import { WishlistService } from '../../shared/services/wishlist.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, NgxCubeLoaderComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export default class ProductPageComponent implements OnInit {
  private readonly singlePageProduct = inject(SingleProductService)
  private readonly route = inject(ActivatedRoute);
  private readonly cart = inject(CartService)
  private readonly routes = inject(Router)
  private readonly ref = inject(ChangeDetectorRef)
  private readonly wishlist = inject(WishlistService)

  display: Product | null = null;

  quantity: number = 0;

  //პირველი ფოტო
  firstImg: string | null = null;
  index:number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.singlePageProduct.loadProduct(id).subscribe((product) => {
          this.display = product
          //ვანიჭებთ პირველ ფოტოს მნიშვნელობას
          this.firstImg = product.images[0]
          this.index = 0;
          this.ref.detectChanges();
        });
      }
    });
  }

  //გადაგვაქ ფოტოს ინდექსი
  imgSet(index: number): void {
    if (this.display?.images) {
      this.index = index;
      // this.firstImg = this.display.images[index]
      this.ref.detectChanges();
    }
  }

  addToCart(id: string, quantity: number){
    if(this.cart.isCartCreated){
      this.cart.createCart(id, this.quantity)!.subscribe((res) => {
        console.log(res)
      })
    }else{
      this.update(id, quantity)
    }
  }

  update(id: string, quantity: number){
    this.cart.updateCart(id, quantity)?.subscribe((res) => {
      console.log(res)
    })
  }

  addToWishlist(product: Product){
    this.wishlist.getWishlist(product)
  }
}
