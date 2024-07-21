import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product, Products } from '../../shared';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent  {
  displayProducts$: Observable<Product>


  constructor(private ProductsService: ProductsService){
    this.displayProducts$ = ProductsService.getProducts(this.config.pageIndex)
  }

  config = {
    pageIndex: 2,
  }

}
