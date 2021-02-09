import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/categories.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url = '/api/categories/';

  constructor(private http:HttpClient) { }

  getCategories():Observable<CategoryModel[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get<CategoryModel[]>(this.url,{headers:headers});
  }
}
