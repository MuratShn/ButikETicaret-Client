import { Component, OnInit } from '@angular/core';
import { MyOrderDto } from 'src/app/models/MyOrderDto';
import { UserDetailDto } from 'src/app/models/UserDetailDto';
import { AccountService } from 'src/app/services/account.service';
import { OrderTransactionsService } from 'src/app/services/order-transactions.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private readonly orderService:OrderTransactionsService,
    private readonly accountSerivce:AccountService
    ) { }

  orders:MyOrderDto[]

  selectedOrder:any

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe(x=>{
      if(x.success){
        this.orders = x.data
        console.log(x.data)
        
      }
      this.orders.forEach(x => {
        x.orderDate =  new Date(x.orderDate).toLocaleDateString("tr-TR")
      });
      this.orders.sort(x=>x.orderDate).reverse();
    })

  }

  commentModal(item:any){
    this.selectedOrder = item
    
    document.querySelector("textarea")!.value = ""
  }
  addComment(productId:number,color:string){
    let text = document.querySelector("textarea")?.value!;
    if(text?.length > 5){
      this.accountSerivce.addComment(productId,color,text).subscribe(x=>{
        console.log(x)
        let modal = document.getElementById("closemodal")
        modal?.click();
      })
    }
    else{
      console.log("valid olmadı")
    }
  }
}
