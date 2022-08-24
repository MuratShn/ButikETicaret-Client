import { Component, OnInit } from '@angular/core';
import { ProductDetailDto } from 'src/app/models/ProductDetailDto';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { LikedProductService } from 'src/app/services/liked-product.service';

@Component({
  selector: 'app-my-favorite-products',
  templateUrl: './my-favorite-products.component.html',
  styleUrls: ['./my-favorite-products.component.css']
})
export class MyFavoriteProductsComponent implements OnInit {

  constructor(
    private readonly likedProductService:LikedProductService,
    private readonly toastrService:CustomToastrService
    ) { }

  products : ProductDetailDto[]=[]
  
  ngOnInit(): void {
    this.likedProductService.getFavorites().subscribe(x=>{
      if(x.success){
        this.products = x.data
      }
    })
  }
  deleteFavorite(item:ProductDetailDto){
    this.likedProductService.removeFavorite(item.id).subscribe(x=>{
      if(x.success){
      let index = this.products.findIndex(x=>{return x === item});
      this.products.splice(index,1)
      this.toastrService.Message("Favori",x.message,{messageType:ToastrMessageType.Info , position : ToastrPosition.TopRight})
    }
    })
  }

}
