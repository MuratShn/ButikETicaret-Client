import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { ProductDetailDto } from 'src/app/models/ProductDetailDto';
import { CategoryService } from 'src/app/services/category.service';
import { LikedProductService } from 'src/app/services/liked-product.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  @Input() products:ProductDetailDto[]

  
  constructor(
    private readonly categoryService:CategoryService,
    private readonly productService:ProductService,
    private readonly likedProductService:LikedProductService,
    private readonly router:Router
    ) {}

  categories:Category[] 
  filtered:string[]=[]

  ngOnInit(): void {
    
    this.categoryService.getAll().subscribe(x=>{
      if(x.success){
        this.categories = x.data
      }
    })
  }

  gender(item:string){
    this.filtered.push(item == "1"?"Erkek":"Kadın")

    console.log(this.products)
    var result = this.products.filter(x=>x.gender != item)
    result.forEach(x => {
      this.products.splice(this.products.indexOf(x),1)
    });
  }

  category(item:string){
    this.filtered.push(item)

    var result = this.products.filter(x=>x.categoryName != item)
    result.forEach(x => {
      this.products.splice(this.products.indexOf(x),1)
    });
  }

  size(item:string){
    this.filtered.push(item)

    let result:any=[]
    let test:any = []

    this.products.forEach(x => {
      x.features.forEach(y => {
        if(y.size == item){
          if(result.findIndex((z:any)=>z.id == x.id) == -1){
            result.push(x)
          }
        }
      });
    });
    
    this.products.forEach(x => {
      if(!result.find((y:any)=>y.id == x.id)){
        test.push(x)
      }
    });


   test.forEach((x:any) => {
    this.products.splice(this.products.indexOf(x),1)
   });
  }

  color(item:string){
    this.filtered.push(item)
    
    let result:any=[]

    this.products.forEach(product => {
      if(!product.colors.includes(item)){
        result.push(product)
      }
    })
    result.forEach((x:any) => {
      this.products.splice(this.products.indexOf(x),1)
    });
    console.log(this.products)
  }

  refresh(){
    this.products.splice(0,this.products.length)
    if(this.router.url.includes("favorites")){
      this.likedProductService.getFavorites().subscribe(x=>{
        x.data.forEach(element => {
          this.products.push(element)
        });
      })
      this.filtered.splice(0,this.filtered.length)
    }
    else{

        console.log(this.products)
        this.productService.getAllProductDetail().subscribe(x=>{
          x.data.forEach(element => {
            this.products.push(element)
          });
        })
        this.filtered.splice(0,this.filtered.length)
    }
     

  
  }

}