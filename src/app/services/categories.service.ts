import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Categories } from '../models/categories.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriesService{

  constructor(private http: Http) { }


  getCategories(): Observable<Categories[]> {
    return this.http.get("http://localhost:3000/categories")
      .map((response: Response) => {
        return response.json();

      })
  }


  getCategory(categoryId) {
    return this.http.get(`http://localhost:3000/categories/${categoryId}`)
      .map((response: Response) => {
        return response.json();

      })
  }
  updateCategory(category) {
    return this.http.put(`http://localhost:3000/categories/${category.id}`, category)
     .map((response: Response) => {
       return response.json();

     })
  }

  addCategory(category) {
    return this.http.post("http://localhost:3000/categories", category)
      .map((response: Response) => {
        return response.json();

      })
  }
  deleteCategory(categorId) {
    return this.http.delete(`http://localhost:3000/categories/${categorId}`)
      .map((response: Response) => {
        return response.json();
      })
  }





}
