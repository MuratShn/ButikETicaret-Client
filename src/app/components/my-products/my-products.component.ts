import { Component, OnInit } from '@angular/core';
import { MyProductDto } from 'src/app/models/MyProductDto';
import { Product } from 'src/app/models/Product';
import { ImageService } from 'src/app/services/ımage.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductImageVM } from 'src/app/viewmodel/ProductImageVM';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  constructor(
    private readonly productService:ProductService,
    private readonly imageService:ImageService
    ) { }
  
  products:MyProductDto[];
  
  //başlangıç değeri belirlemzsek modal ilk açıldıgında hata veriyor
  product:MyProductDto = "s" as any; 

  color:string //son product ıcın

  ngOnInit(): void {
   this.productService.getMyProducts().subscribe(x=>{
    this.products = x.data
    console.log(this.products);
  });

  }
  openModal(id:number){
    this.product = this.products.find(x=>x.id == id)!;
    console.log(this.product)
  }
  selectedComp(item:any,product:any){
    this.color = item;
  }
}