import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Stocks } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;
  stoc: FormGroup;
  stocks: Stocks[];

  constructor(
    private productService: ProductService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      describe: [null, Validators.required],
      saleValue: [null, Validators.required],
      type: [{ value: 'ALIMENTO', disabled: true }],
      stocks: [[], Validators.required],
    });
    this.productService.readStocks().subscribe((stock: any) => {
      this.stocks = stock.content;
    });
  }

  transformProducts() {
    const formProducts = this.form.getRawValue();
    formProducts.saleValue = Number(formProducts.saleValue);
    return formProducts;
  }

  createProduct() {
    const formProducts = this.transformProducts();
    this.productService.create(formProducts).subscribe(() => {
      this.productService.showMessage('Produto criado!');
      this.router.navigate(['/products']);
    });
    console.log(formProducts);
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
