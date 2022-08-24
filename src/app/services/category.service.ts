import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { listResponseModel } from '../models/listModelResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "https://localhost:44338/api/"

  constructor(
    private readonly httpClient:HttpClient
    ) { }

    getAll():Observable<listResponseModel<Category>>{
      let newPath = this.apiUrl + "Category/getAll";
      return this.httpClient.get<listResponseModel<Category>>(newPath);
    }
}
