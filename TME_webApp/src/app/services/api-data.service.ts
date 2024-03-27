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
    // return this.http.get<any>(this.apiUrl);
     // Retrieve the JWT token from local storage
     const token = localStorage.getItem('token');

     // Set the Authorization header with the token
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

     // Make an authenticated GET request to the products endpoint
     return this.http.get<any>(`${this.apiUrl}`, { headers });
  }

  postData(data: any): Observable<any> {
    // return this.http.post<any>(`${this.apiUrl}`, data);
    const token = localStorage.getItem('token');

    // Create headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    });

    // Include the headers in the HTTP request
    const options = { headers: headers };

    // Make the POST request with the data and headers
    return this.http.post<any>(`${this.apiUrl}`, data, options);
  }

  updateData(newData: any[]): Observable<any> {
    // On vérifie si l'ID est défini
    // const url = this.apiUrl;
    // return this.http.patch<any>(url, newData)
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Create headers with the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    });

    // Include the headers in the HTTP request
    const options = { headers: headers };

    // Make the PATCH request with the new data and headers
    return this.http.patch<any>(this.apiUrl, newData, options);
  }

  getTransData(): Observable<any> {
    // return this.http.get<any>(this.apiTransUrl);
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    // Set the Authorization header with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Make an authenticated GET request to the products endpoint
    return this.http.get<any>(`${this.apiTransUrl}`, { headers });
  }

}
