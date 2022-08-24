import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listModelResponse';
import { ProductFeature } from '../models/ProductFeature';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductfeatureService {
  apiUrl="https://localhost:44338/api/";

  constructor(private httpClient:HttpClient) { }
  
  addFeatures(features:ProductFeature[]):Observable<ResponseModel>{
    let newpath = this.apiUrl+"ProductFeature/addFeatures"
    return this.httpClient.post<ResponseModel>(newpath,features)
  }
}
