import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  apiUrl = "https://localhost:44338/api/"
  constructor(private readonly httpClient:HttpClient) { }

  addProductImage(images:any):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Images/addProductImages";
    return this.httpClient.post<ResponseModel>(newPath,images);
  }
}
