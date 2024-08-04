import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { SingleProductService } from '../../shared/services/single-product.service';
import { Products } from '../../shared';
import { SingleProduct } from '../../shared/interface/singleProduct';
import { routes } from '../../app.routes';
import { AppComponent } from '../../app.component';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export default class ProductPageComponent implements OnInit {
  private readonly singlePageProduct = inject(SingleProductService)
  private readonly route = inject(ActivatedRoute);
  private readonly cart = inject(CartService)
  private readonly routes = inject(Router)
  private readonly ref = inject(ChangeDetectorRef)

  display: SingleProduct | null = null;

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
        });
      }
    });
  }

  //გადაგვაქ ფოტოს ინდექსი
  imgSet(index: number){
    if(this.display){
      //ფოტოზე დაჭერის შემდეგ ფოტოს ინდექსით
      //ხდება პირველი ფოტოს განახლება
      this.firstImg = this.display.images[index]
      this.index = index
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
}
