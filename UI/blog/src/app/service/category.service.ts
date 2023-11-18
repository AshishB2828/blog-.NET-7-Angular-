import { Injectable } from '@angular/core';
import { AddCategoryRequest, Category } from '../features/models/category.model';
import {Observable} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  
  addCategory(model: AddCategoryRequest) : Observable<void> {
    return this.http.post<void>(environment.apiBaseUrl+'/api/categories', model);
  }

  getAllCategories():Observable<Category[]> {
    return this.http.get<Category[]>( environment.apiBaseUrl+'/api/categories') 
  }

}