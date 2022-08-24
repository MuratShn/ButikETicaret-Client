import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDetailDto } from 'src/app/models/UserDetailDto';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  constructor(
    private readonly userService:UserService,
    private readonly fb:FormBuilder,
    private readonly toastrService:CustomToastrService
    ) { }
  
  user:UserDetailDto

  userUpdateForm:FormGroup
  passwordUpdateForm:FormGroup

  ngOnInit(): void {
    this.userService.getUserDetail().subscribe(x=>{
      if(x.success){
        this.user = x.data
        console.log(x.data)
      }
    })

    this.userUpdateForm = this.fb.group({
      name:["",[Validators.required,Validators.minLength(2)]],
      surname:["",[Validators.required,Validators.minLength(2)]],
      email:["",[Validators.required,Validators.email]],
      gender:[],
    })

    this.passwordUpdateForm = this.fb.group({
      password:["",[Validators.required,Validators.min(3)]],
      newPassword:["",[Validators.required,Validators.min(3)]],
      newPasswordConfirm:["",[Validators.required,Validators.min(3)]],
    })
    
  }
  updatePassword(){

    if(this.passwordUpdateForm.valid){
      let model = this.passwordUpdateForm.value

      if(model.newPassword == model.newPasswordConfirm){
        this.userService.refreshPassword(model).subscribe(x=>{
          this.toastrService.Message(x.message,"Başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
        })
      }
      else{
        this.toastrService.Message("Şifreler Aynı Değiş","Uyarı",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
      }

    }
    else{
      this.toastrService.Message("Formu Kurallara Göre Doldurunuz","Validasyon",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
    }
  }

  updateInfo(){

    let gender = document.querySelectorAll("input[name=inlineRadioOptions]");
    gender.forEach((x:any) => {
      if(x.checked){
        this.userUpdateForm.get("gender")?.setValue(x.value)
      }
    });
    
    if(!this.userUpdateForm.get("gender")){
      this.userUpdateForm.get("gender")?.setValue('0')
    }
    

    if(this.userUpdateForm.valid){
      let model = this.userUpdateForm.value;
      this.userService.refreshUserInfo(model).subscribe(x=>{
        console.log(x)
        if(x.success){
          this.toastrService.Message(x.message,"Başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
          this.ngOnInit();
        }
        else{
          this.toastrService.Message(x.message,"Hata",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
        }
      });
    }

    else{
      this.toastrService.Message("Formu Kurallara Göre Doldurunuz","Validasyon",{messageType:ToastrMessageType.Error,position:ToastrPosition.TopRight})
    }
  }

}
