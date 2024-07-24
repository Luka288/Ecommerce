import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product, Products } from '../../shared';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MainComponent  {
  displayProducts$: Observable<Products>
  caruselProducts$: Observable<Products>


  constructor(private ProductsService: ProductsService){
    this.displayProducts$ = this.ProductsService.getProducts(this.config.pageIndex, this.config.pageSize)
    this.caruselProducts$ = this.ProductsService.getProducts(1, 4)
  }

  config = {
    pageIndex: 1,
    pageSize: 5,
  }

  

}
