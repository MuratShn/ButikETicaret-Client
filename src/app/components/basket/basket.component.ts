import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/Address';
import { CartDto } from 'src/app/models/CartDto';
import { CartItem } from 'src/app/models/cartıtem';
import { OrderModel } from 'src/app/models/OrderModel';
import { ProductFeature } from 'src/app/models/ProductFeature';
import { AccountService } from 'src/app/services/account.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { OrderTransactionsService } from 'src/app/services/order-transactions.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  constructor(
    private readonly cartService:CartService,
    private readonly productService:ProductService,
    private readonly addressService:AccountService,
    private readonly buyService:OrderTransactionsService,
    private readonly router:Router,
    private readonly toastrService:CustomToastrService
    ) { }

    
  cartItems:CartItem[]=[]
  products:CartDto[]=[]
  toplam:number
  address:Address[]=[]

  ngOnInit(): void {
    this.listCart();
    console.log(this.products)
    console.log(this.cartItems)
    this.getAddress();
    console.log(this.address.length)
    
  }

  getCart(){
  }
  
  deleteCart(featuresId:number,color:string,size:string){
    this.cartService.deleteToCart(color,size,featuresId)
    this.listCart()
  }

  listCart(){
    this.cartItems = []
    this.products = []
    this.toplam = 0
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
        this.cartItems.push(cartitem);
      }
    }

    this.products
    this.cartItems.forEach(x => {      
      this.productService.getCart(x.feature.id,x.feature.productId,x.feature.color,x.feature.size).subscribe(y=>{
        y.data.quantity = x.quantitiy
        this.toplam += y.data.productPrice * y.data.quantity
        this.products.push(y.data)
        })
  });
  console.log(this.cartItems)
  }
  
  Buy(){
    
    let address = document.querySelectorAll("#address")
    let selectedAddres:number;
    let sayac = 0

    address.forEach((x:any) => {
      if(x.checked){
        sayac += 1
        selectedAddres = x.value
      }
    });
    
    if(sayac== 1 && this.cartItems.length > 0){ 

      let order = new OrderModel();
      order.soldProducts = this.cartItems
      order.addressId = +selectedAddres!
      order.fee = this.toplam
      this.buyService.Buy(order).subscribe(x=>{
        if(x.success){
          this.toastrService.Message(x.message,"Başarılı",{messageType:ToastrMessageType.Success , position : ToastrPosition.TopCenter})

          this.cartService.clearCarts();
          this.router.navigate(["/"])
        }
      })

    }
    else{
      this.toastrService.Message("Adres Seçmek zorundasınız / Sepet Boş Olmamalı","Adres",{messageType:ToastrMessageType.Warning , position : ToastrPosition.TopRight})
    }
    
  }

  getAddress(){
    this.addressService.getMyAllAddress().subscribe((x:any)=>{
      if(x.success){
        this.address = x.data
        console.log(x.data)
      }
    })
  }
}
