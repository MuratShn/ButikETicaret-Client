import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetailDto } from 'src/app/models/UserDetailDto';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
   
  user:UserDetailDto

  constructor(
    private readonly userService:UserService,
    public readonly authService:AuthService,
    private readonly router:Router
    ) { 
   }

  
  ngOnInit(): void {
    console.log("oninit")
    if(this.authService.isAuthenticated){
      this.userService.getUserDetail().subscribe(x=>{
        if(x.success){
          this.user=x.data;
          console.log(this.user)
        }
        else{
          
        }
      })
    }
  }

  logout(){
    this.user = null as any;
    localStorage.removeItem("_T");
    localStorage.removeItem("_E");
    localStorage.removeItem("_R");
    this.authService.identitiyChech();
    this.router.navigate(["/"]);
  }

}
