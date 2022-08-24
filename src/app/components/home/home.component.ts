import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map, take, timeout, timer } from 'rxjs';
import { ProductDetailDto } from 'src/app/models/ProductDetailDto';
import { AuthService } from 'src/app/services/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrOptions, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(
    private readonly _productService:ProductService,
    private readonly authService:AuthService,
    ) { }
  
 
  products : ProductDetailDto[]
  

  ngOnInit(): void {
    this._productService.getAllProductDetail().subscribe(x=>{

      if(x.success){
        this.products = x.data //statüslere gore kontrol edilicek yada apide ediceksin
        console.log(x.data)
        console.log(this.products)
      }
    })
  }


  async test(){
    console.log("ilk",localStorage.getItem("_T"))

    this.authService.refreshTokenLogin(localStorage.getItem("_R")?.toString()!).subscribe(x=>{
      console.log(x)
      if(x.success){
        localStorage.setItem("_T",x.data.token)
        localStorage.setItem("_E",x.data.expiration!)
        localStorage.setItem("_R",x.data.refreshToken!)
        console.log("degist,",localStorage.getItem("_T"))
      }
      else{
        console.log("hata olduı")
      }
    })
    
    await new Promise(f => setTimeout(f, 500));
    console.log("sonraki",localStorage.getItem("_T"))
  }
}
