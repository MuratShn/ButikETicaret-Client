import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDetailDto } from 'src/app/models/ProductDetailDto';
import { UserDetailDto } from 'src/app/models/UserDetailDto';
import { _isAuthenticated } from 'src/app/services/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { LikedProductService } from 'src/app/services/liked-product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-product-favorite',
  templateUrl: './add-product-favorite.component.html',
  styleUrls: ['./add-product-favorite.component.css']
})
export class AddProductFavoriteComponent implements OnInit {

  @Input() product:ProductDetailDto
  
  constructor(
    private readonly userService:UserService,
    private readonly router:Router,
    private readonly likedProductService:LikedProductService,
    private readonly toastrService:CustomToastrService
  ) { }

  ngOnInit(): void {
  }
  addFavorite(){
    if(this.product){

      if(_isAuthenticated){
        this.likedProductService.addFavorite(this.product.id).subscribe(x=>{
          if(x.success){
            this.toastrService.Message(x.message,"Başarılı",{messageType:ToastrMessageType.Success , position : ToastrPosition.TopRight})
          }
          else{
            this.toastrService.Message(x.message,"Hata",{messageType:ToastrMessageType.Error , position : ToastrPosition.TopRight})
          }
        });

      }
      else{
        this.toastrService.Message("Giriş Yapmanız gerekmektedir","Hata",{messageType:ToastrMessageType.Info , position : ToastrPosition.TopRight})
        this.router.navigate(["login"])
      }
    }
    
  }
}
