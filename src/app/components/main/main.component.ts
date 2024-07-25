import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product, Products } from '../../shared';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export default class MainComponent implements OnInit  {
  // displayProducts$: Observable<Products> = of({ products: {} } as Products);
  // caruselProducts$: Observable<Products>
  config = {
    pageIndex: 1,
    pageSize: 10,
    totalItems: 0,
  }

  // constructor(private ProductsService: ProductsService, private cdr: ChangeDetectorRef){
  //   this.caruselProducts$ = this.ProductsService.getProducts(1, 4)
  // }

  // private pageIndexSubject = new BehaviorSubject<number>(this.config.pageIndex)
  // private pageSizeSubject = new BehaviorSubject<number>(this.config.pageSize)


  // ngOnInit(): void {
  //   this.displayProducts$ = combineLatest([
  //     this.pageIndexSubject,
  //     this.pageSizeSubject,
  //   ]).pipe(
  //     switchMap(([pageIndex, pageSize]) =>
  //       this.ProductsService.getProducts(pageIndex, pageSize)
  //     ),
  //     map(res => {
  //       this.config.pageIndex = this.pageIndexSubject.value;
  //       this.config.pageSize = this.pageSizeSubject.value;
  //       this.config.totalItems = res.total;
  //       this.cdr.markForCheck()
  //       return res;
  //     })
  //   );
  // }

  // onPageChange(pageIndex: number, event: MouseEvent): void{
  //   event.preventDefault();
  //   this.pageIndexSubject.next(pageIndex)
  // }

  // onPageSizeChange(pageSize: number): void{
  //   this.pageSizeSubject.next(pageSize)
  // }

  // get totalPages(): number {
  //   return Math.ceil(this.config.totalItems / this.config.pageSize);
  // }
  
  private readonly httpRequest = inject(ProductsService)


  ngOnInit(): void {
    this.loadProducts(this.config.pageIndex, this.config.pageSize)
    this.forDiscountedProducts()
  }

  display: Products | null = null;
  discounted: Products | null = null;

  loadProducts(pageIndex: number, pageSize: number){
    this.httpRequest.getProducts(pageIndex, pageSize).subscribe((res) => {
      this.display = res
    })
  }

  forDiscountedProducts(){
    this.httpRequest.getProducts(1, 5).subscribe((res) => {
      this.discounted = res
    })
  }

}
