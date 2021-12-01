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
  teste: number;
  sValue: number;

  sto: Content[];

  displayedColumns = ['Nome', 'Valor'];

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

    const id = this.userId;
    this.productService.readById(id).subscribe((psto: any) => {
      this.sto = psto.stocks;
      this.teste = psto.amountStocks;
      this.sValue = psto.saleValue;
    });
  }

  applyDiscount(): void {
    this.router.navigate(['/products']);
  }
}
