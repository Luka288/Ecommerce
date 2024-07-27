import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product, Products } from '../../shared';
import { BehaviorSubject, combineLatest, map, Observable, of, retry, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export default class MainComponent implements OnInit  {
  private readonly httpRequest = inject(ProductsService)
  private readonly categoryRequest = inject(CategoriesService)

  display: Products | null = null;
  discounted: Products | null = null;
  // categoryLaptop: Products | null = null;
  isCategory: boolean = false;
  currentCategory: number | null = null;

  config = {
    pageIndex: 1,
    pageSize: 12,
    totalItems: 0,
  }

  ngOnInit(): void {
    this.loadProducts(this.config.pageIndex, this.config.pageSize)
    this.forDiscountedProducts()
  }



  loadProducts(pageIndex: number, pageSize: number){
    this.httpRequest.getProducts(pageIndex, pageSize).subscribe((res) => {
      this.display = res
      this.config.totalItems = res.total
      this.isCategory= false
    })
  }

  forDiscountedProducts(): void{
    this.httpRequest.getProducts(1, 5).subscribe((res) => {
      this.discounted = res
    })
  }

  pageChange(pageIndex: number, event: MouseEvent): void{
    event.preventDefault();
    this.config.pageIndex = pageIndex
    if(this.isCategory && this.currentCategory !== null){
      this.getCategory(this.currentCategory, this.config.pageSize, pageIndex)
    }else{
      this.loadProducts(pageIndex, this.config.pageSize)
    }
  }

  // categoryPagination(page_index: number, event: MouseEvent): void{
  //   event.preventDefault()
  //   this.config.pageIndex = page_index
  //   this.getCategory(page_index, this.config.pageSize)
  // }


  getCategory(category: number, page_size: number, page_index: number): void{
    this.categoryRequest.getCategories(category, page_index, page_size).subscribe((res) => {
      this.isCategory = true;
      this.currentCategory = category;
      this.display = res;
      this.config.totalItems = res.total;
      console.log("იგზავნება კატეგორიის რექვესტი", res.products)
    })

  }

  get totalPages(): number {
    return Math.ceil(this.config.totalItems / this.config.pageSize);
  }


}
