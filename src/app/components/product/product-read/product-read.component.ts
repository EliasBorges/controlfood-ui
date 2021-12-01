import { ProductService } from './../product.service';
import { Content, Discount, Product, Stocks } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css'],
})
export class ProductReadComponent implements OnInit {
  products: Product[];
  public userId;
  product: Discount;
  sto: Content;

  displayedColumns = [
    'Nome',
    'Valor de Venda',
    'Valor de Custo',
    'Descrição',
    'action',
  ];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) {
    this.route.params.subscribe((params) => (this.userId = params['id']));
  }

  ngOnInit(): void {
    this.productService.read().subscribe((product: any) => {
      this.products = product.content;
      this.sto = product.Stocks;
    });
  }
}
