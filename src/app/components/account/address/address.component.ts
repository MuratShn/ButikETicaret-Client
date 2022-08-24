import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/Address';
import { AccountService } from 'src/app/services/account.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  address:Address[]

  constructor(
    private readonly addressService:AccountService,
    private readonly toastrService:CustomToastrService
    ) { }

  ngOnInit(): void {
    this.getAddress();

  }

  getAddress(){
    console.log("test")
    this.addressService.getMyAllAddress().subscribe((x:any)=>{
      if(x.success){
        this.address = x.data
        console.log(x.data)
      }
    })

  }

  deleteAddress(item:Address){
    this.addressService.deleteAddress(item.id).subscribe(x=>{
        if(x.success){
          this.toastrService.Message(x.message,"Adres",{messageType:ToastrMessageType.Success , position : ToastrPosition.TopRight})
          this.ngOnInit();
        }
        else{
          this.toastrService.Message(x.message,"Adres",{messageType:ToastrMessageType.Error , position : ToastrPosition.TopRight})
        }
    })
  }
  

}
