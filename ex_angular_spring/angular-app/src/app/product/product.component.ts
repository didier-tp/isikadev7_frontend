import { Component, OnInit } from '@angular/core';
import { Product } from '../common/data/product';
import { ProductService } from '../common/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  numero : number; 
  product : Product ;
  message ="";

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
  }

  searchByNum(){
    this.product = null;
    this.productService.searchProductByNum$(this.numero).subscribe(
      { next : (p)=> { this.product = p; this.message ="ok"},
        error : (error)=> { console.log(error); this.message ="erreur: " + error.message}
      });
  }

}
