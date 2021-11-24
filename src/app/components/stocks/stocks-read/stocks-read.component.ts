import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stocks } from '../../product/product.model';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-stocks-read',
  templateUrl: './stocks-read.component.html',
  styleUrls: ['./stocks-read.component.css'],
})
export class StocksReadComponent implements OnInit {
  stocks: Stocks[];

  displayedColumns = ['name', 'value', 'action'];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.readStocks().subscribe((stock: any) => {
      this.stocks = stock.content;
    });
  }
}
