import { Content, Product, Stocks } from './../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css'],
})
export class ProductUpdateComponent implements OnInit {
  form: FormGroup;
  stoc: FormGroup;
  product: Content;
  stock: Stocks[];
  public userId;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) {
    this.route.params.subscribe((params) => (this.userId = params['id']));
  }

  ngOnInit(): void {
    this.createForm();
    const id = this.userId;
    this.productService.readById(id).subscribe((product: any) => {
      this.product = product;
      this.patchFormValue(this.product);
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [, Validators.required],
      describe: [, Validators.required],
      saleValue: [, Validators.required],
      type: [{ value: 'ALIMENTO', disabled: true }],
      stocks: this.formBuilder.array([this.initId()]),
    });
  }

  initId() {
    return (this.stoc = this.formBuilder.group({
      id: ['', Validators.required],
    }));
  }

  transformCommercialConditions() {
    const commercialConditions = this.form.getRawValue();
    commercialConditions.saleValue = Number(commercialConditions.saleValue);
    return commercialConditions;
  }

  updateProduct(): void {
    const commercialConditions = this.transformCommercialConditions();
    this.productService
      .update(this.userId, commercialConditions)
      .subscribe(() => {
        this.productService.showMessage('Produto atualizado com sucesso!');
        this.router.navigate(['/products']);
      });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  patchFormValue(value) {
    this.form.patchValue({
      name: value.name,
      describe: value.describe,
      saleValue: value.saleValue,
      type: value.type,
    });
  }
}
