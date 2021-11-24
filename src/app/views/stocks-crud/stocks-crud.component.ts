import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-stocks-crud',
  templateUrl: './stocks-crud.component.html',
  styleUrls: ['./stocks-crud.component.css'],
})
export class StocksCrudComponent implements OnInit {
  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Materia Prima',
      icon: 'storefront',
      routeUrl: '/products',
    };
  }

  ngOnInit(): void {}

  navigateToCreateStocks(): void {
    this.router.navigate(['products/stocks/create']);
  }
}
