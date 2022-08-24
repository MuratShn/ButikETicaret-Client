import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService:AuthService,
    private readonly formBuilder:FormBuilder,
    private router: Router,
    private socialAuthService: SocialAuthService,
    private readonly toastrService:CustomToastrService
    ) {
      
      this.socialAuthService.authState.subscribe((user: SocialUser) => {
        console.log(user)
        this.authService.externalLogin(user).subscribe(x=>{
          if(x.success){ 
              localStorage.setItem("_T",x.data.token)
              localStorage.setItem("_R",x.data.refreshToken)

              // if(this.authService.redirectUrl){
              //   this.router.navigate([this.authService.redirectUrl])
              //   this.authService.redirectUrl = ""
              // }
              // else{
              //   this.router.navigate(["/"])
              // }
              this.toastrService.Message("Giriş Başarılı","Giriş",{messageType:ToastrMessageType.Info , position : ToastrPosition.TopRight})
              this.router.navigate(["/"])

              this.authService.identitiyChech();
      }})
      });
    }
    loginForm : FormGroup

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail:["",[Validators.required,Validators.minLength(3)]],
      password:["",[Validators.required,Validators.minLength(3)]],
    })
  }

  login(){
    
    if(this.loginForm.valid){
      let loginForm = Object.assign({},this.loginForm.value)

      this.authService.login(loginForm).subscribe(x=>{
        if(x.success){ 
        localStorage.setItem("_T",x.data.token)
        localStorage.setItem("_E",x.data.expiration)
        localStorage.setItem("_R",x.data.refreshToken)
     
        if(this.authService.redirectUrl){
          this.router.navigate([this.authService.redirectUrl])
          this.authService.redirectUrl = ""
        }
        else{
          this.router.navigate(["/"])
        }
        this.toastrService.Message(x.message,"Giriş",{messageType:ToastrMessageType.Success , position : ToastrPosition.TopRight})
        this.authService.identitiyChech();
        
      }
      else{
        this.toastrService.Message(x.message,"Giriş",{messageType:ToastrMessageType.Warning , position : ToastrPosition.TopRight})
        console.log("giriş başarısız")
      }
      })
    }
    else{
      console.log("valid olmadı")
    }
  }
  

  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }

}

// switch (user.provider) {
//   case "GOOGLE":
//     this.authService.googleLogin(user).subscribe(x=>{
//       if(x.success){ 
//         localStorage.setItem("_T",x.data.token)
//         localStorage.setItem("_E",x.data.expiration)
//         localStorage.setItem("_R",x.data.refreshToken)
//         this.authService.identitiyChech();

//         if(this.authService.redirectUrl){
//           this.router.navigate([this.authService.redirectUrl])
//           this.authService.redirectUrl = ""
//         }
//         else{
//           this.router.navigate(["/"])
//         }
        
//       }
//       else{
//         console.log("giriş başarısız")
//       }
//     })
//     break;
//   case "FACEBOOK":
//     console.log()
//    this.authService.facebookLogin(user).subscribe(x=>{
//     if(x.success){ 
//       localStorage.setItem("_T",x.data.token)
//       localStorage.setItem("_E",x.data.expiration)
//       localStorage.setItem("_R",x.data.refreshToken)
//       this.authService.identitiyChech();

//       if(this.authService.redirectUrl){
//         this.router.navigate([this.authService.redirectUrl])
//         this.authService.redirectUrl = ""
//       }
//       else{
//         this.router.navigate(["/"])
//       }
      
//     }
//     else{
//       console.log("giriş başarısız")
//     }
//    })

// }
