import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class NodesService {

  constructor(private http: Http) { }


  getNodes() {
    return this.http.get("http://localhost:3000/nodes")
      .map((response: Response) => {
        return response.json();

      })
  }


  getNode(nodeId) {
    return this.http.get(`http://localhost:3000/nodes/${nodeId}`)
      .map((response: Response) => {
        return response.json();

      })
  }
  
  updateNode(node) {
   return this.http.put(`http://localhost:3000/nodes/${node.id}`, node)
     .map((response: Response) => {
       return response.json();

     })
  }

  addNode(node) {
    return this.http.post("http://localhost:3000/nodes", node)
      .map((response: Response) => {
        return response.json();

      })
  }
  deleteNode(nodeId) {
    return this.http.delete(`http://localhost:3000/nodes/${nodeId}`)
      .map((response: Response) => {
        return response.json();
      })
  }





}
