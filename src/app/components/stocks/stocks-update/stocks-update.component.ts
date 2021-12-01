import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stocks } from '../../product/product.model';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-stocks-update',
  templateUrl: './stocks-update.component.html',
  styleUrls: ['./stocks-update.component.css'],
})
export class StocksUpdateComponent implements OnInit {
  stock: Stocks;
  public userId;
  form: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) {
    this.route.params.subscribe((params) => (this.userId = params['id']));
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [, Validators.required],
      value: [, Validators.required],
    });
    let id = this.userId;
    this.productService.readByIdStocks(id).subscribe((prod: any) => {
      this.stock = prod;
      this.patchFormValue(this.stock);
    });
  }

  transformCommercialConditions() {
    const commercialConditions = this.form.getRawValue();
    commercialConditions.value = Number(commercialConditions.value);
    return commercialConditions;
  }

  updateProduct(): void {
    const commercialConditions = this.transformCommercialConditions();
    this.productService
      .updateStocke(this.userId, commercialConditions)
      .subscribe(() => {
        this.productService.showMessage(
          'Materia Prima atualizado com sucesso!'
        );
        this.router.navigate(['/products/stocks']);
      });
    console.log(commercialConditions);
  }

  cancel(): void {
    this.router.navigate(['/products/stocks']);
  }

  patchFormValue(value) {
    this.form.patchValue({
      name: value.name,
      value: value.value,
    });
  }
}
