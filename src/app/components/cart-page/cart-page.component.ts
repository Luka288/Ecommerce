import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { UserCart } from '../../shared/interface/cart';
import { SingleProduct } from '../../shared/interface/singleProduct';
import { SingleProductService } from '../../shared/services/single-product.service';
import { SweetAlertService } from '../../shared/services/sweet-alert.service';
import { NgxCubeLoaderComponent } from "ngx-cube-loader";
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, NgxCubeLoaderComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export default class CartPageComponent implements OnInit {
  private readonly cart = inject(CartService)
  private readonly singleProductService = inject(SingleProductService)
  private readonly changeDetector = inject(ChangeDetectorRef)
  private readonly alerts = inject(SweetAlertService)
  private readonly ref = inject(ChangeDetectorRef)

  forImg: SingleProduct | null = null;
  display: UserCart | null = null;
  productThumbnails: { [key: string]: string } = {};
  titleSetMap: Map<string, string> = new Map();
  isLoading: boolean = true;
  checkVerify: boolean = false;

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct() {
    this.cart.getCart()?.pipe(
      tap(res => {
        this.display = res;
        if (this.display?.products.length) {
          this.titleSetMap.clear();
          this.display.products.forEach(product => {
            this.getImg(product.productId);
          });
          this.changeDetector.markForCheck();
        }
        this.checkVerify = true;
        this.isLoading = false;
      }),
      catchError(err => {
        console.log('Error', err.error.error)
        if(err.error.error === 'User needs to verify email' ){
          this.checkVerify = false
          this.isLoading = false
        }
        return 'error'
      })
    ).subscribe();
  }
  


  getImg(productid: string) {
    this.singleProductService.loadProduct(productid).subscribe((res) => {
      this.productThumbnails[productid] = res.thumbnail;
      this.titleSetMap.set(productid, res.title);
    });
  }


  removeOneItem(id: string){
    this.cart.deleteItem(id)?.subscribe((res) => {
      this.alerts.toast('Item removed', 'success', 'green')
      this.getProduct()
      console.log(res)
    })
  }

}
