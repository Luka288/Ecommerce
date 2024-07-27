import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Products } from '../../shared';
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
  private readonly cdr = inject(ChangeDetectorRef)

  display: Products | null = null;
  discounted: Products | null = null;
  currentCategory: number | null = null;
  isCategory: boolean = false;

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
    this.config.pageIndex = pageIndex;
    if (this.isCategory && this.currentCategory !== null) {
      this.getCategory(this.currentCategory, this.config.pageSize, pageIndex);
    } else {
      this.loadProducts(pageIndex, this.config.pageSize);
    }
  }


  getCategory(category: number, page_size: number, page_index: number = 1): void{
    this.config.pageIndex = page_index;
    this.categoryRequest.getCategories(category, page_index, page_size).subscribe((res) => {
      this.isCategory = true;
      this.currentCategory = category;
      this.display = res;
      this.config.totalItems = res.total;
      page_index = 1;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.config.totalItems / this.config.pageSize);
  }
}
