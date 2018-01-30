import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class TagsService{

  constructor(private http: Http) { }


  getTags() {
    return this.http.get("http://localhost:3000/tags")
      .map((response: Response) => {
        return response.json();

      })
  }


  getCategory(tagId) {
    return this.http.get(`http://localhost:3000/tags/${tagId}`)
      .map((response: Response) => {
        return response.json();

      })
  }
  updateCategory(tag) {
    return this.http.put(`http://localhost:3000/tags/${tag.id}`, tag)
     .map((response: Response) => {
       return response.json();

     })
  }

  addCategory(tag) {
    return this.http.post("http://localhost:3000/tags", tag)
      .map((response: Response) => {
        return response.json();

      })
  }
  deleteCategory(tagId) {
    return this.http.delete(`http://localhost:3000/tags/${tagId}`)
      .map((response: Response) => {
        return response.json();
      })
  }





}
