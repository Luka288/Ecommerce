import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output, output } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product, Products } from '../../shared';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { CategoriesService } from '../../shared/services/categories.service';
import { SearchServiceService } from '../../shared/services/search-service.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export default class MainComponent implements OnInit  {
  private readonly httpRequest = inject(ProductsService)
  private readonly categoryRequest = inject(CategoriesService)
  private readonly searchService = inject(SearchServiceService)
  private readonly cartService = inject(CartService)

  
  
  display: Products | null = null;
  discounted: Products | null = null;
  currentCategory: number | null = null;
  isCategory: boolean = false;
  search: Product[] = []
  forSearch: Product[] | null = null;
  addedProduct: Product[] = []


  config = {
    pageIndex: 1,
    pageSize: 12,
    totalItems: 0,
  }

  ngOnInit(): void {
    this.loadProducts(this.config.pageIndex, this.config.pageSize)
    this.forDiscountedProducts()

    this.searchService.searchQuery$.subscribe(query => {
      this.searchFun(query);
    });
  }
  
  searchFun(userSearch: string){
    const filteredProducts = this.search.filter(product =>
      product.title.toLowerCase().includes(userSearch.toLowerCase())
    );

    if(userSearch == ''){
      this.forSearch = null;
      return 
    }

    if(filteredProducts.length > 0){
      this.forSearch = filteredProducts
    }else{
      this.forSearch = null
    }
  }

  loadProducts(pageIndex: number, pageSize: number){
    this.httpRequest.getProducts(pageIndex, pageSize).subscribe((res) => {
      this.display = res
      this.search.push(...res.products)
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

  // getCart(product: Product){
  //   this.cartService.addProduct(product)
  // }


  passItem(id: string, number: number) {
    const res = this.cartService.createCart(id, number)

    if(res){
      res.subscribe((res)=> {
        console.log(res)
      })
    }
  }

  getItemCart(){
   const cart = this.cartService.getCart()

    if(cart){
      cart.subscribe((res)=> {
        console.log(res)
      })
    }
  }

  deleteCart(){
    const deletCart = this.cartService.clearCart();

    if(deletCart){
      deletCart.subscribe((res)=> {
        console.log(res)
      })
    }
  }
}
