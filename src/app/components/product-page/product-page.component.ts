import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SingleProductService } from '../../shared/services/single-product.service';
import { Products } from '../../shared';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export default class ProductPageComponent implements OnInit {
  private readonly singlePageProduct = inject(SingleProductService)
  private readonly route = inject(ActivatedRoute);

  product: SingleProductInter[] | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.loadSingleProduct(id);
      console.log(params);
    });
  }

  loadSingleProduct(_id: string): void {
    this.singlePageProduct.loadProduct(_id).subscribe((res: SingleProductService) => {
      this.product = [res]
      console.log(res);
    });
  }
}
