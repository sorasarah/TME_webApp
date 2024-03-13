import { ApiService } from './../services/api-data.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface ProductData {
  name: string;
  category: string;
  purchase_price: number;
  sold_price: number;
  quantity: number;
  description: string;
  availability: boolean;


}
@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css'],
})

export class SimpleTableComponent implements AfterViewInit, OnInit {

  constructor(private apiService: ApiService) { }

  displayedColumns: string[] = ['name', 'purchase_price', 'sold_price', 'quantity', 'description', 'availability'];
  dataSource = new MatTableDataSource<ProductData>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.apiService.getData().subscribe(
      (response) => {
        console.log('API Response:', response);
        this.dataSource.data = response;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  applyFilter(category: string | null) {
    console.log("hello filter");
    if (category != null) {
      this.dataSource.filterPredicate = (data: ProductData) => {
        return data.category === category;
      };
      this.dataSource.filter = this.dataSource.toString();
    } else {
      // Clear the filter
      this.dataSource.filterPredicate = () => true;
      this.dataSource.filter = '';
    }
  }
}

