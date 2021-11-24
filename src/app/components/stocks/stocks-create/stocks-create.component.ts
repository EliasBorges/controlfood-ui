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
  transformCommercialConditions() {
    const commercialConditions = this.form.getRawValue();
    commercialConditions.value = Number(commercialConditions.value);
    return commercialConditions;
  }

  createProduct() {
    const commercialConditions = this.transformCommercialConditions();
    this.productService
      .postValidateCode(commercialConditions)
      .subscribe((s) => {
        console.log(s);
        this.productService.showMessage('Produto criado!');
        this.router.navigate(['/products']);
      });
  }

  cancel(): void {
    this.router.navigate(['/products/stocks']);
  }
}
