import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionData } from '../sold-graph/sold-graph.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000/productsList/'
  private apiTransUrl = 'http://localhost:8000/transactionsData/'

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
     // Retrieve the JWT token from local storage
     const token = localStorage.getItem('token');
     // Set the Authorization header with the token
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
     // Make an authenticated GET request to the products endpoint
     return this.http.get<any>(`${this.apiUrl}`, { headers });
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  updateData(newData: any[]): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<any>(`${this.apiUrl}`, newData, { headers })
  }

  getTransData(): Observable<any> {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');
    // Set the Authorization header with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Make an authenticated GET request to the products endpoint
    return this.http.get<any>(`${this.apiTransUrl}`, { headers });
  }

}
