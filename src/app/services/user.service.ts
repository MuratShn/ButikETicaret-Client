import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/LoginModel';
import { ResponseModel } from '../models/ResponseModel';
import { singleResponseModel } from '../models/singleResponseModel';
import { UserDetailDto } from '../models/UserDetailDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44338/api/";

  constructor(private httpClient:HttpClient) { }

  getUserDetail():Observable<singleResponseModel<UserDetailDto>>{
    let newPath = this.apiUrl + "Users/getUserProfile";
    return  this.httpClient.get<singleResponseModel<UserDetailDto>>(newPath)
  }
  
  refreshPassword(model:any):Observable<ResponseModel>{
    let newpath = this.apiUrl+"Users/refreshPassword"

    return this.httpClient.post<ResponseModel>(newpath,model)
  }
  refreshUserInfo(user:LoginModel):Observable<ResponseModel>{
    let newpath = this.apiUrl + "Users/refreshUserInfo"
    return this.httpClient.post<ResponseModel>(newpath,user)
  }
  
}
