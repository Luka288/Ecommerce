import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output, output } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product, Products } from '../../shared';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { CategoriesService } from '../../shared/services/categories.service';
import { SearchServiceService } from '../../shared/services/search-service.service';
import { CartService } from '../../shared/services/cart.service';
import { UserCart } from '../../shared/interface/cart';
import { SweetAlertService } from '../../shared/services/sweet-alert.service';

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
  private readonly alert = inject(SweetAlertService)

  constructor(private changeDetector: ChangeDetectorRef){}
  
  
  display: Products | null = null;
  discounted: Products | null = null;
  currentCategory: number | null = null;
  isCategory: boolean = false;
  search: Product[] = []
  forSearch: Product[] | null = null;
  addedProduct: Product[] = []

  passitemTrack: boolean = false


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
    })

    const storedPassItemTrack = localStorage.getItem('passitemTrack');
    if (storedPassItemTrack) {
      this.passitemTrack = JSON.parse(storedPassItemTrack);
      } else {
      this.passitemTrack = false;
    }
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

  passItem(id: string, number: number) {
    const res = this.cartService.createCart(id, number)
    if(res){
      res.subscribe((res)=> {
        console.log(res)
        console.log(this.passitemTrack)
        localStorage.setItem('passitemTrack', JSON.stringify(true));
        this.changeDetector.detectChanges();
      })
    }
  }

  getItemCart(){
   const cart = this.cartService.getCart()

    if(cart){
      cart.subscribe((res: UserCart)=> {
        console.log(res)
      })
    }
  }

  deleteCart() {
    const deleteCart = this.cartService.clearCart();
    if (deleteCart) {
      deleteCart.subscribe((res) => {
        console.log(res);
      });
      localStorage.setItem('passitemTrack', JSON.stringify(false));
    }
  }

  updateCart(id: string, number: number){
    const update = this.cartService.updateCart(id, number);
    if(update){
      update.subscribe((res) => {
        console.log('updating')
        console.log(res)
      })
    }
  }
}
