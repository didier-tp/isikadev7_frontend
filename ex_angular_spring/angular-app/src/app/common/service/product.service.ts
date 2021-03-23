import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../data/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //private _apiBaseUrl ="http://localhost:9998/produit"; 
  private _apiBaseUrl ="./produit"; //with ng serve --proxy-config proxy.conf.json

  constructor(private http : HttpClient) { }

  searchProductByNum$(num: number): Observable<Product>{
    let url = this._apiBaseUrl + "/rechercherNumeroProduit/"+num ;
     console.log( "in searchProductById , url = " + url);
    return this.http.get<Product>(url);
  }
}
