import { Component, OnInit } from '@angular/core';
import { ProductDetailDto } from 'src/app/models/ProductDetailDto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-random-product',
  templateUrl: './random-product.component.html',
  styleUrls: ['./random-product.component.css']
})
export class RandomProductComponent implements OnInit {

  products : ProductDetailDto[]
  constructor(
    private readonly productService:ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getNewProducts(6).subscribe(x=>{
      if(x.success)
      {this.products = x.data}
      console.log(this.products)
    })
  }

}
