import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { SingleProductService } from '../../shared/services/single-product.service';
import { Products } from '../../shared';
import { SingleProduct } from '../../shared/interface/singleProduct';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export default class ProductPageComponent implements OnInit {
  private readonly singlePageProduct = inject(SingleProductService)
  private readonly route = inject(ActivatedRoute);

  display: SingleProduct | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.singlePageProduct.loadProduct(id).subscribe((product) => {
          this.display = product
        });
      }
    });
  }
}
