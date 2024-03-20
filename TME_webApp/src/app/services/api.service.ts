import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Example GET request
  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productsList/`);
  }

  // Example POST request
  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, data);
  }

  // Add more methods for other HTTP request types as needed

}
