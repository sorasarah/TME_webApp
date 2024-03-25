import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<any>(this.apiUrl);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  updateData(newData: any[]): Observable<any> {
    // On vérifie si l'ID est défini
    const url = this.apiUrl;
    return this.http.patch<any>(url, newData)
  }

  getTransData(): Observable<any> {
    return this.http.get<any>(this.apiTransUrl);
  }

  getTransDataFiltered(startDate: Date, endDate: Date): Observable<TransactionData[]> {
    // Adjust your API endpoint to accept start and end dates as query parameters
    const apiUrl = `${this.apiTransUrl}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    return this.http.get<TransactionData[]>(apiUrl);
  }

}
