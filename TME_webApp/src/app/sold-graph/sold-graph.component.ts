import { ApiService } from './../services/api-data.service';
import { Component } from '@angular/core';
import { AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

export interface TransactionData{
  id: number;
  transaction: string;
  transaction_price: number;
  add_date: Date;
}

@Component({
  selector: 'app-sold-graph',
  templateUrl: './sold-graph.component.html',
  styleUrls: ['./sold-graph.component.css'],
  template: '<canvas id="myChart"></canvas>'
})

export class SoldGraphComponent implements AfterViewInit {
  // result: any;
  // add_date: Date;
  // edit_date: Date;
  // ca: number;
  // chart: any = [];
  
  @ViewChild('barChart') barChart! : ElementRef;

  constructor(private service: ApiService){
  }

  ngAfterViewInit() {
    this.createBarChart();
    this.service.getData
  }

  ngOnInit() : void {
     // this.ApiService.TransactionData().subscribe(){
    //   (response) => {
    //     console.log('API Response:', response);
    //     this.dataSource.data = response.map((element: TransactionData) => {
    //       return { ...element, } //editable: true };
    //     });
    //     // this.dataSource.data = response;
    //   },
    //   (error) => {
    //     console.error('API Error:', error);
    //   }
    // }
  }

  createBarChart() {
    const ctx = this.barChart.nativeElement.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['add_date', 'edit_date'],
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


}
