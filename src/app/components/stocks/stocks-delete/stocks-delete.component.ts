import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stocks } from '../../product/product.model';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-stocks-delete',
  templateUrl: './stocks-delete.component.html',
  styleUrls: ['./stocks-delete.component.css'],
})
export class StocksDeleteComponent implements OnInit {
  stock: Stocks;
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
    this.productService.readByIdStocks(id).subscribe((prod: any) => {
      this.stock = prod;
    });
  }

  deleteProduct(): void {
    this.productService.deleteStock(this.userId).subscribe(() => {
      this.productService.showMessage('Produto excluido com sucesso!');
      this.router.navigate(['/products/stocks']);
    });
  }

  cancel(): void {
    this.router.navigate(['/products/stocks']);
  }
}
