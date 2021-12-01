import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-stocks-create',
  templateUrl: './stocks-create.component.html',
  styleUrls: ['./stocks-create.component.css'],
})
export class StocksCreateComponent implements OnInit {
  form: FormGroup;
  stocks: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      value: [null, Validators.required],
    });
  }
  transformStocks() {
    const formStocks = this.form.getRawValue();
    formStocks.value = Number(formStocks.value);
    return formStocks;
  }

  createProduct() {
    const formStocks = this.transformStocks();
    this.productService.postValidateCode(formStocks).subscribe((s) => {
      console.log(s);
      this.productService.showMessage('Materia Prima Criada!');
      this.router.navigate(['/products/stocks']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products/stocks']);
  }
}
