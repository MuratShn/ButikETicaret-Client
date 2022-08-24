import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly authService:AuthService,
    private readonly router:Router,
    private readonly toastrService:CustomToastrService
  ) { }
  registerForm:FormGroup;


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name:["",[Validators.required,Validators.minLength(2)]],
      surname:["",[Validators.required,Validators.minLength(2)]],
      username:["",[Validators.required,Validators.minLength(3)]],
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required,Validators.min(3)]],
      gender:["",Validators.required],
      passwordConfirm:["",[Validators.required,Validators.min(3)]]
    })
  }
  register(){
    if(!(this.registerForm.get("password")?.value == this.registerForm.get("passwordConfirm")?.value)){
      this.toastrService.Message("Hata","Şifreler Uyuşmuyor",{messageType:ToastrMessageType.Info , position : ToastrPosition.TopRight})
    }
    else{
      if(this.registerForm.valid){
        let registerForm = Object.assign({},this.registerForm.value)
        this.authService.register(registerForm).subscribe(x=>{
          if(x.success){
            this.toastrService.Message("Başarılı",x.success,{messageType:ToastrMessageType.Success , position : ToastrPosition.BottomFullWidth})
            this.router.navigate(["/Login"])
          }
        })
      }
      else{
        this.toastrService.Message("Hata","Lütfen Kurallara Uyunuz (Valid)",{messageType:ToastrMessageType.Warning , position : ToastrPosition.TopRight})
        console.log("valid olmadı")
      }
    }
  }

}
