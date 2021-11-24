import { Content, Product } from './../product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {
  products: Content;
  public userId;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => (this.userId = params['id']));
  }

  ngOnInit(): void {
    let id = this.userId;
    this.productService.readById(id).subscribe((prod: any) => {
      this.products = prod;
    });
  }

  deleteProduct(): void {
    this.productService.delete(this.userId).subscribe(() => {
      this.productService.showMessage('Produto excluido com sucesso!');
      this.router.navigate(['/products']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
