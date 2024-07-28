import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchServiceService } from './shared/services/search-service.service';
import { Product } from './shared/interface/products';
import { ProductsService } from './shared';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly searchService = inject(SearchServiceService)
  private readonly productsService = inject(ProductsService)


  searchResults: Product[] | null = null;
  isDropdownVisible = false;


  config = {
    pageIndex: 1,
    pageSize: 12,
    totalItems: 0,
  }

  onSearch(event: Event){
    const target = event.target as HTMLInputElement
    const value = target.value || '';
    this.searchService.setSearchQuery(value)
    this.searchProducts(value);
    this.isDropdownVisible = !!value;
  }

  searchProducts(search: string): void {
    if (search === '') {
      this.searchResults = null;
      return;
    }
  
    this.productsService.getProducts(1, 50).subscribe((res) => {
      this.searchResults = res.products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    });
  }


}
