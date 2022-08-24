import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/ResponseModel';
import { Observable } from 'rxjs';
import { MyProductDto } from '../models/MyProductDto';
import { listResponseModel } from '../models/listModelResponse';


@Injectable({
  providedIn: 'root'
})

export class LikedProductService {
  apiUrl = "https://localhost:44338/api/"
  constructor(
    private readonly httpClient:HttpClient,
    ) { }

    addFavorite(productId:number):Observable<ResponseModel>{

      let newPath = this.apiUrl + ("LikedProduct/addFavorites");

      return this.httpClient.post<ResponseModel>(newPath,{"productId":productId});
    }
    getFavorites():Observable<listResponseModel<MyProductDto>>{
      let newPath = this.apiUrl + ("LikedProduct/getFavorite");
      return this.httpClient.get<listResponseModel<MyProductDto>>(newPath)
    }
    removeFavorite(productId:number):Observable<ResponseModel>{
      let newPath = this.apiUrl + "LikedProduct/removerFavorite"
      return this.httpClient.post<listResponseModel<MyProductDto>>(newPath,{"productId":productId})
    }
}
