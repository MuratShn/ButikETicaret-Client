import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable, pipe } from 'rxjs';
import { LoginModel } from '../models/LoginModel';
import { RegisterModel } from '../models/RegisterModel';
import { ResponseModel } from '../models/ResponseModel';
import { singleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/TokenModel';
import { UserDetailDto } from '../models/UserDetailDto';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:44338/api/";

  public redirectUrl:string

  constructor(
    private httpClient:HttpClient,
    private readonly helper:JwtHelperService,
    private readonly userService:UserService
    ) { }

  register(user:RegisterModel):Observable<ResponseModel>{
    let newpath = this.apiUrl+"Users/register"
    return this.httpClient.post<ResponseModel>(newpath,user)
  }
  login(user:LoginModel):Observable<singleResponseModel<TokenModel>>{
    let newpath = this.apiUrl+"Users/Login"
    return this.httpClient.post<singleResponseModel<TokenModel>>(newpath,user)
  }
  googleLogin(user:SocialUser):Observable<singleResponseModel<TokenModel>>{
    let newpath = this.apiUrl+"Users/googleLogin"
    return this.httpClient.post<singleResponseModel<TokenModel>>(newpath,user)
  }
  facebookLogin(user:SocialUser):Observable<singleResponseModel<TokenModel>>{
    let newpath = this.apiUrl + "Users/facebookLogin"
    return this.httpClient.post<singleResponseModel<TokenModel>>(newpath,user);
  }
  isAuth():Observable<ResponseModel>{
    let newpath = this.apiUrl+"Users/isAuth"
    return this.httpClient.get<ResponseModel>(newpath);
  }
  refreshTokenLogin(refreshToken:string){
    let newPath = this.apiUrl + "Users/refreshTokenLogin"
    return this.httpClient.post<singleResponseModel<TokenModel>>(newPath,{refreshToken:refreshToken})
  }
  externalLogin(user:SocialUser):Observable<singleResponseModel<TokenModel>>{
    let newpath = this.apiUrl + "Users/externalLogin"
    return this.httpClient.post<singleResponseModel<TokenModel>>(newpath,user);
  }

  identitiyChech(){
    const token = this.helper.tokenGetter()  
    let result;

    try {
      let isExpired = this.helper.isTokenExpired(token);
      if(!isExpired){ //eger tokenın zamanı hala varsa false donucek
        result = true
      }
    } 
    catch (error) {
      result = false
    }
    if(!result){_isAuthenticated = false}
    else{_isAuthenticated = true}

    console.log(_isAuthenticated)
    
    return result
  }
  
  get isAuthenticated():boolean{
    return _isAuthenticated
  }

}
export let _isAuthenticated:boolean;