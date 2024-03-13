import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  private apiUrl = 'http://localhost:8000/productsList/'

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data}`);
  }

  postData(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/data`, data);
  }

  putData(data:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/data`, data)
  }
}
