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
  categoryLaptop: Products | null = null;

  config = {
    pageIndex: 1,
    pageSize: 10,
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
    this.loadProducts(pageIndex, this.config.pageSize)
  }

  categoryPagination(page_index: number, event: MouseEvent): void{
    event.preventDefault()
    this.config.pageIndex = page_index
    this.getCategory(page_index, this.config.pageSize)
  }

  get totalPages(): number{
    return Math.ceil(this.config.totalItems / this.config.pageSize)
  }


  getCategory(category: number, page_size: number){
    this.categoryRequest.getCategories(category, page_size).subscribe((res) => {
      this.categoryLaptop = res
      this.config.totalItems = res.total
      console.log("იგზავნება კატეგორიის რექვესტი", res.products)
    })

  }

}
