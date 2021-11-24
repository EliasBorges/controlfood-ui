import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Content, Discount, Product, Stocks } from './product.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'https://control-food-api.herokuapp.com';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  showMessag(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 8000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  create(p: Product): Observable<Product[]> {
    return this.http.post<Content>(`${this.baseUrl}/products`, p).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  postValidateCode(s: Stocks) {
    return this.http.post<Stocks>(`${this.baseUrl}/stocks`, s);
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readStocks(): Observable<Product[]> {
    return this.http.get<Stocks>(`${this.baseUrl}/stocks`).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/products/${id}`;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readByIdDiscount(id: number): Observable<Product> {
    const url = `${this.baseUrl}/products/${id}/discount`;
    return this.http.get<Discount>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readByIdStocks(id: number): Observable<Stocks> {
    const url = `${this.baseUrl}/stocks/${id}`;
    return this.http.get<Stocks>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(id: any, form: any): Observable<Product> {
    const url = `${this.baseUrl}/products/${id}`;
    return this.http.put<Product>(url, form).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  updateStocke(id: any, form: any): Observable<Stocks> {
    const url = `${this.baseUrl}/stocks/${id}`;
    return this.http.put<Stocks>(url, form).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/products/${id}`);
  }

  deleteStock(id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/stocks/${id}`);
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }
}
