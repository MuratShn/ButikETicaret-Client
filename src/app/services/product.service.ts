import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDto } from '../models/CartDto';
import { listResponseModel } from '../models/listModelResponse';
import { MyProductDto } from '../models/MyProductDto';
import { Product } from '../models/Product';
import { ProductDetailDto } from '../models/ProductDetailDto';
import { ResponseModel } from '../models/ResponseModel';
import { singleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:44338/api/"
  constructor(private readonly httpClient:HttpClient) { }

  getAllProductDetail():Observable<listResponseModel<MyProductDto>>{
    let newPath = this.apiUrl + "Product/getAllProductDetail" 
    return this.httpClient.get<listResponseModel<MyProductDto>>(newPath);
  }

  productAdd(product:Product):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Product/productAdd"
    return this.httpClient.post<ResponseModel>(newPath,product)
  }

  getById(id:number):Observable<singleResponseModel<Product>>{
    let newPath = this.apiUrl + "Product/getById?id="+id
    return this.httpClient.get<singleResponseModel<Product>>(newPath)
  }
  getLastProduct():Observable<singleResponseModel<number>>{
    let newPath = this.apiUrl + ("Product/getLastProduct")
    return this.httpClient.get<singleResponseModel<number>>(newPath);
  }
  getMyProducts():Observable<listResponseModel<MyProductDto>>{
    let newPath = this.apiUrl + ("Product/getMyProduct")
    return this.httpClient.get<listResponseModel<MyProductDto>>(newPath);
  }
  getByIdProductDetail(id:number,color:string):Observable<singleResponseModel<ProductDetailDto>>{
    let newPath = this.apiUrl + (`Product/getByIdProductDetail?id=${id}&color=${color}`) 
    return this.httpClient.get<singleResponseModel<ProductDetailDto>>(newPath);
  }
  getNewProducts(count:number):Observable<listResponseModel<MyProductDto>>{
    let newPath = this.apiUrl + "Product/getNewProducts?Count="+count 
    return this.httpClient.get<listResponseModel<MyProductDto>>(newPath);
  }
  getCart(featuresId:number,productId:number, color:string, size:string):Observable<singleResponseModel<CartDto>>{
    let newpath = this.apiUrl + `Product/getCarts?featuresId=${featuresId}&productId=${productId}&color=${color}&size=${size}`
    return this.httpClient.get<singleResponseModel<CartDto>>(newpath);
  }

  
  

}