import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { StocksCreateComponent } from './components/stocks/stocks-create/stocks-create.component';
import { StocksDeleteComponent } from './components/stocks/stocks-delete/stocks-delete.component';
import { StocksUpdateComponent } from './components/stocks/stocks-update/stocks-update.component';
import { StocksCrudComponent } from './views/stocks-crud/stocks-crud.component';
import { ProductDiscountComponent } from './components/product/product-discount/product-discount.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductCrudComponent,
  },
  {
    path: 'products/stocks',
    component: StocksCrudComponent,
  },
  {
    path: 'products/create',
    component: ProductCreateComponent,
  },
  {
    path: 'products/update/:id',
    component: ProductUpdateComponent,
  },
  {
    path: 'products/updateStocks/:id',
    component: StocksUpdateComponent,
  },
  {
    path: 'products/delete/:id',
    component: ProductDeleteComponent,
  },
  {
    path: 'products/discount/:id',
    component: ProductDiscountComponent,
  },
  {
    path: 'products/deleteStocks/:id',
    component: StocksDeleteComponent,
  },
  {
    path: 'products/stocks/create',
    component: StocksCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
