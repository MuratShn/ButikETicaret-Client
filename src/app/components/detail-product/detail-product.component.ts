import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyProductDto } from 'src/app/models/MyProductDto';
import { ProductCommentDto } from 'src/app/models/ProductCommentDto';
import { ProductDetailDto } from 'src/app/models/ProductDetailDto';
import { AccountService } from 'src/app/services/account.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  productId:number;
  productColor:string
  product:ProductDetailDto
  comments:ProductCommentDto[]

  constructor(
    private actRoute: ActivatedRoute,
    private readonly router:Router,
    private readonly cartService:CartService,
    private readonly productService:ProductService,
    private readonly commentService:AccountService
    ) {}

  ngOnInit(): void {
    console.log("test")
    this.productId =  this.actRoute.snapshot.params["productId"]
    this.productColor = this.actRoute.snapshot.params["color"];
    console.log(this.productId,this.productColor);
    this.productService.getByIdProductDetail(this.productId,this.productColor).subscribe(x=>{
      if(x.success){
        this.product = x.data;
        this.product.gender = (x.data.gender = "1") ? "Erkek" : (x.data.gender = "2") ? "Kadın" : (x.data.gender = "9") ? "Unisex" : "Bilinmiyor"
        console.log(x.data)
        console.log(this.product)
      }
    })
    this.commentService.getProductComments(this.productId).subscribe(x=>{
      if(x.success){
        this.comments = x.data
        console.log(this.comments)
      }
      this.comments.forEach(x => {
        x.date =  new Date(x.date).toLocaleDateString("tr-TR")
      });
      this.comments.sort(x=>x.date).reverse();
    })
  }

  addCart(item:ProductDetailDto){
    let color = this.actRoute.snapshot.params["color"];
    let selectedSize:string="";
    let sizes = document.getElementsByName("size")
    sizes.forEach((x:any) => {
      if(x.checked){
        selectedSize = (x.value)
      }
    });
    if(selectedSize && color){
      console.log(selectedSize,color)
      this.product.features.forEach(item => {
        if(item.color == color && item.size == selectedSize){
          this.cartService.addToCart(color,selectedSize,item) 
        }
      });
    }
    
  }
  test(){
    var result = this.cartService.list();
    console.log(result)
  }

}
