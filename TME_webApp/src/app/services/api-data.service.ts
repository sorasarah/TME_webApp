import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8000/productsList'

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }

  postData(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  updateData(id: number, newData:any): Observable<any> {
    // On vérifie si l'ID est défini
    const url = id ? `${this.apiUrl}/${id}/` : this.apiUrl;
    return this.http.patch<any>(url, newData)
  }
}
