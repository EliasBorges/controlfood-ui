import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Content, Discount } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-discount',
  templateUrl: './product-discount.component.html',
  styleUrls: ['./product-discount.component.css'],
})
export class ProductDiscountComponent implements OnInit {
  public userId;
  product: Discount;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) {
    this.route.params.subscribe((params) => (this.userId = params['id']));
  }

  ngOnInit(): void {
    this.productService
      .readByIdDiscount(this.userId)
      .subscribe((product: any) => {
        this.product = product;
      });
  }

  applyDiscount(): void {
    this.productService.readByIdDiscount(this.userId).subscribe((v: any) => {
      this.product = v.value;
      this.productService.showMessag(`${this.product}`);
      this.router.navigate(['/products']);
    });
    console.log(this.product);
  }
}
