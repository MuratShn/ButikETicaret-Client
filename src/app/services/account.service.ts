import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/Address';
import { listResponseModel } from '../models/listModelResponse';
import { MyCommentDto } from '../models/MyCommentDto';
import { ProductCommentDto } from '../models/ProductCommentDto';
import { ResponseModel } from '../models/ResponseModel';

export const address:Address[]=[]

@Injectable({
  providedIn: 'root'
})


export class AccountService {

  constructor(private readonly httpClient:HttpClient) { }
  apiUrl="https://localhost:44338/api/";


  //#Address  
      addAddress(address:Address):Observable<ResponseModel>{
        let newpath = this.apiUrl+"Address/addAddress"
        return this.httpClient.post<ResponseModel>(newpath,address)
      }
      getMyAllAddress():Observable<listResponseModel<Address>>{
        let newpath = this.apiUrl+"Address/getAllAddress"
        return this.httpClient.get<listResponseModel<Address>>(newpath)
      }
      deleteAddress(addressId:number):Observable<ResponseModel>{
        let newpath = this.apiUrl+"Address/deleteAddress?AddressId="+addressId
        return this.httpClient.delete<ResponseModel>(newpath)
      }
  //#endAddress
  

  //#Comment  
  addComment(productId:number,color:string,comment:string):Observable<ResponseModel>{
    let newPath = this.apiUrl + "ProductComment/Add"
    return this.httpClient.post<ResponseModel>(newPath,{productId:productId,color:color,comment:comment})
  }
  getMyComments():Observable<listResponseModel<MyCommentDto>>{
    let newPath = this.apiUrl + "ProductComment/getMyComments"
    return this.httpClient.get<listResponseModel<MyCommentDto>>(newPath);
  }
  getProductComments(productId:number):Observable<listResponseModel<ProductCommentDto>>{
    let newPath = this.apiUrl + "ProductComment/getProductComments?productId=" + productId
    return this.httpClient.get<listResponseModel<ProductCommentDto>>(newPath); 
  }
  //#endComment

  
  //#Order  
  
  //#endOrder
    
}
