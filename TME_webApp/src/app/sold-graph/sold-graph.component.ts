import { ApiService } from './../services/api-data.service';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Chart } from 'chart.js/auto';

export interface TransactionData {
  id: number;
  transaction: string;
  add_date: string; 
  transaction_price: number;
}

@Component({
  selector: 'app-sold-graph',
  templateUrl: './sold-graph.component.html',
  styleUrls: ['./sold-graph.component.css']
})
export class SoldGraphComponent implements OnInit {
  chart: any;
  startDate: Date = new Date;
  endDate: Date = new Date;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // this.fetchDataAndRenderChart();
    this.apiService.getTransData().subscribe(
      (res) => {
        console.log('Transaction API Response:', res);
        const aggregatedData = this.aggregateData(res);
        this.renderChart(aggregatedData);
      }, (error) => {
        console.error('Transaction API Error:', error);
      }
    );
  }

  startDateSelected(event: MatDatepickerInputEvent<Date>) {
    // Handle start date selection here
    console.log('Start date selected:', event.value);
    // You can perform further actions like updating the start date property or triggering a data refresh
  }

  endDateSelected(event: MatDatepickerInputEvent<Date>) {
    // Handle end date selection here
    console.log('End date selected:', event.value);
    // You can perform further actions like updating the end date property or triggering a data refresh
  }
  
  aggregateData(data: any[]): any {
    const aggregated: { [year: number]: { [month: number]: { [week: number]: { [day: number]: { purchases: number, sales: number } } } } } = {};
    data.forEach(entry => {
      console.log(data)
        const date = new Date(entry.add_date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const week = this.getWeekNumber(date);
        const day = date.getDate();

        aggregated[year] = aggregated[year] || {};
        aggregated[year][month] = aggregated[year][month] || {};
        aggregated[year][month][week] = aggregated[year][month][week] || {};
        aggregated[year][month][week][day] = aggregated[year][month][week][day] || { purchases: 0, sales: 0 };
      
        if (entry.transaction === '1') {
            aggregated[year][month][week][day].purchases += entry.transaction_price;
        } else if (entry.transaction === '0') {
            aggregated[year][month][week][day].sales += entry.transaction_price;
        }
    });
    return aggregated;
}

  renderChart(data: any): void {
    // Extract purchases and sales data from aggregated data
    const labels = [];
    const purchasesData = [];
    const salesData = [];
    // Loop through aggregated data and push the values to the respective arrays
    for (const year in data) {
      for (const month in data[year]) {
        for (const week in data[year][month]) {
          for (const day in data[year][month][week]) {
            labels.push(`${year}-${month}-${day}`);
            purchasesData.push(data[year][month][week][day].purchases);
            salesData.push(data[year][month][week][day].sales);
          }
        }
      }
    }
    // Render chart here using Chart.js
    this.chart = new Chart('transactionChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Purchases',
          data: purchasesData,
          // fill: false,
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }, {
          label: 'Sales',
          data: salesData,
          // fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
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

  getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date.getTime() - firstDayOfYear.getTime()) / 86400000);
    return Math.ceil((dayOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
}


