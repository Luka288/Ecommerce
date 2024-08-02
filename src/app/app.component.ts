import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SearchServiceService } from './shared/services/search-service.service';
import { Product } from './shared/interface/products';
import { ProductsService } from './shared';
import { CommonModule } from '@angular/common';
import { CartService } from './shared/services/cart.service';
import { LocalStorageKeys } from './shared/enums';
import { AuthService } from './shared/services/auth.service';
import { AfterAuth, BeforeAuth, NavBar } from './shared/consts/navigation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly searchService = inject(SearchServiceService)
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly auth = inject(AuthService)
 
  readonly user$ = this.auth.user$
  readonly beforeAuth = BeforeAuth
  readonly afterAuth = AfterAuth
  readonly navBar = NavBar


  searchResults: Product[] | null = null;
  isDropdownVisible = false;

  addedProduct: Product[] = [];


  config = {
    pageIndex: 1,
    pageSize: 12,
    totalItems: 0,
  }

  ngOnInit(): void {
    // this.cartService.products$.subscribe((res) => {
    //   this.addedProduct = res
    //   console.log(this.cartService.products$)
    // })
  }

  onSearch(event: Event){
    const target = event.target as HTMLInputElement
    let value = target.value || '';
    this.searchService.setSearchQuery(value)
    this.searchProducts(value);
    this.isDropdownVisible = !!value;
  }

  clearSearch(){
    this.isDropdownVisible = false
    this.searchResults = []
  }

  searchProducts(search: string): void {
    if (search === '') {
      this.searchResults = null;
      this.isDropdownVisible = false;
      return;
    }
  
    this.productsService.getProducts(1, 50).subscribe((res) => {
      this.searchResults = res.products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      );
    });
  }


  // cartProductCount(product: Product){
  //   this.cartService.products$.subscribe((res) => {
  //     this.addedProduct = res
  //     console.log(this.cartService.products$)
  //   })
  // }


  logOut(){
    this.auth.logOut()
  }

}
