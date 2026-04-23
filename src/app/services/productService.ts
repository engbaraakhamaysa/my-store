import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'assets/data.json';

  constructor(private http: HttpClient) {}

  // Get All Products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      catchError((error) => {
        console.error('Error fetching products:', error);
        return of([]);
      }),
    );
  }

  // Get Product By ID
  getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<Product[]>(this.url).pipe(
      map((products) => products.find((p) => Number(p.id) === Number(id))),
      catchError((error) => {
        console.error('Error fetching product by id:', error);
        return of(undefined);
      }),
    );
  }
}
