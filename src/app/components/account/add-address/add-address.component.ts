import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { UserDetailDto } from 'src/app/models/UserDetailDto';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  constructor(
    private readonly fb:FormBuilder,
    private readonly userService:UserService,
    private readonly addressService:AccountService,
    private readonly ac:AddressComponent
    ) { }
  
  addressAddForm:FormGroup

  ngOnInit(): void {

    this.addressAddForm = this.fb.group({
      title:["",[Validators.required,Validators.minLength(3)]],
      adress:["",[Validators.required,Validators.minLength(5)]]
    })
  }
  
  addAddress(){
    
    if(this.addressAddForm.valid){
      let addressModel = this.addressAddForm.value;
      this.addressService.addAddress(addressModel).subscribe(x=>{

        if(x.success)
        {
          let modal = document.getElementById("closemodal")
            if(modal){
              modal.click()
            }
            this.ac.getAddress();
        }
        
      })
    }
  }

 
}
