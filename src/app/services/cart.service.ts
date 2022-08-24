import { Injectable } from '@angular/core';
import { CartDto } from '../models/CartDto';
import { CartItem } from '../models/cartıtem';
import { CartItems, ProductCart } from '../models/cartItems';
import { ProductFeature } from '../models/ProductFeature';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './custom-toastr.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private readonly productService:ProductService,private readonly toastrService:CustomToastrService) { }

  addToCart(color:string,size:string,fea:ProductFeature){
    let cartItem = new CartItem();

    if(localStorage.getItem(JSON.stringify(fea))){ //aynı urun sepette var
      let quality = +localStorage.getItem(JSON.stringify(fea))!; 
      quality ++;
      localStorage.setItem(JSON.stringify(fea),quality.toString()); 

      let item = CartItems.find(x=>x.feature.id == fea.id)!;

      CartItems[CartItems.indexOf(item)].quantitiy ++;
      
      this.test()
      this.toastrService.Message("Sepeteki Sayısı Arttıldı","Sepet",{messageType:ToastrMessageType.Success , position : ToastrPosition.TopRight})
    }
    
    else{
      localStorage.setItem(JSON.stringify(fea),"1")
      cartItem.feature=fea
      cartItem.quantitiy = 1;

      CartItems.push(cartItem)

      console.log("Eklendi")
      this.toastrService.Message("Ürün Sepete Eklendi","Sepet",{messageType:ToastrMessageType.Success , position : ToastrPosition.TopRight})
      this.test()
      
      console.log(ProductCart)
    }

  }

  deleteToCart(color:string,size:string,fea:number){
    
    let cartItem = CartItems.find(x=>x.feature.id == fea)!;

    if(cartItem.quantitiy == 1){
      
      CartItems.splice(CartItems.indexOf(cartItem),CartItems.indexOf(cartItem) + 1);
      localStorage.removeItem(JSON.stringify(cartItem.feature));
      this.test()
      this.toastrService.Message("Sepetten Kaldırıldı","Sepet",{messageType:ToastrMessageType.Info , position : ToastrPosition.TopRight})
      
      
    }
    else{
      let quality = +localStorage.getItem(JSON.stringify(cartItem.feature))!;
      quality--;
      localStorage.setItem(JSON.stringify(cartItem.feature),quality.toString());
      
      CartItems[CartItems.indexOf(cartItem)].quantitiy --;
      this.test()
      this.toastrService.Message("Sepetteki Ürün Sayısı Azaltıldı","Sepet",{messageType:ToastrMessageType.Info , position : ToastrPosition.TopRight})

    }
  }
  
  list():CartDto[]{
    CartItems.length = 0
    for (let i = 0; i < localStorage.length; i++) {
      if(localStorage.key(i)!.length > 10){
        let fea:ProductFeature =  JSON.parse(localStorage.key(i) || '{}');
        console.log(fea)
        
        let qq = localStorage.getItem(JSON.stringify(fea))
        let quantitiy:number;
        
        if(qq)
        {
          quantitiy = +qq        
        }
        else{
          quantitiy = 1;
        }
  
        let cartitem = new CartItem()
        cartitem.feature = fea;
        cartitem.quantitiy = quantitiy;
        CartItems.push(cartitem);
      }
    }
    this.test()
    console.log(CartItems)

   return ProductCart;
  }

  clearCarts(){
    CartItems.length = 0
    for (let i = 0; i < localStorage.length; i++) {
      if(localStorage.key(i)!.length > 10){
        let fea:ProductFeature =  JSON.parse(localStorage.key(i) || '{}');
        localStorage.removeItem(JSON.stringify(fea));
      }
    }
    this.test();
  }
  test(){
    ProductCart.splice(0,ProductCart.length)
      CartItems.forEach(x => {      
        this.productService.getCart(x.feature.id,x.feature.productId,x.feature.color,x.feature.size).subscribe(y=>{
          y.data.quantity = x.quantitiy
          ProductCart.push(y.data)
          })
    });
  }

}