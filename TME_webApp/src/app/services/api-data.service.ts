import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000/'

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}productsList/`);
  }

  postData(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  updateData(id: number, newData:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/`, newData)
  }
}
