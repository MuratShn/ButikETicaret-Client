import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { listResponseModel } from '../models/listModelResponse';
import { MyOrderDto } from '../models/MyOrderDto';
import { OrderModel } from '../models/OrderModel';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderTransactionsService {

  apiUrl = "https://localhost:44338/api/";
  
  constructor(private readonly httpClient:HttpClient) { }

  Buy(order:OrderModel):Observable<ResponseModel>{
    let newpath = this.apiUrl+"OrderTransactions/Buy"
    return this.httpClient.post<ResponseModel>(newpath,order)
  }
  getMyOrders():Observable<listResponseModel<MyOrderDto>>{
    let newpath = this.apiUrl + "OrderTransactions/getMyOrders"
    return this.httpClient.get<listResponseModel<MyOrderDto>>(newpath)
  }

}
