import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../services/api-data.service';

interface TransactionDataMarge {
  id: number;
  transaction: string;
  add_date: string;
  transaction_price: number;
}

@Component({
  selector: 'app-marge-graph',
  templateUrl: './marge-graph.component.html',
  styleUrls: ['./marge-graph.component.css']
})
export class MargeGraphComponent implements OnInit {
  chart: any;
  transactionType: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getTransData().subscribe(
      (res: TransactionDataMarge[]) => {
        this.transactionType = res;
        // console.log(this.transactionType);

        const aggregatedData = this.aggregateData(this.transactionType);
        // console.log("aggregatedData", aggregatedData);

        this.renderChart(aggregatedData);
      },
      (error: any) => {
        console.error('Transaction API Error:', error);
      }
    );
  }

  aggregateData(data: any[]): any {
    const aggregated: { [year: number]: { purchases: number, sales: number } } = {};
    data.forEach(entry => {
      // Convert add_date string to Date object
      const date = new Date(entry.add_date);
      const year = date.getFullYear();
      // Ensure aggregated object has the year property initialized
      if (!aggregated[year]) {
        aggregated[year] = { purchases: 0, sales: 0 };
      }
      // Check transaction type and update purchases or sales accordingly
      if (entry.transaction === '1') { // Assuming '0' represents purchases
        aggregated[year].purchases += parseFloat(entry.transaction_price);

      } else if (entry.transaction === '0') { // Assuming '1' represents sales
        aggregated[year].sales += parseFloat(entry.transaction_price);

      }
    });
    return aggregated;
  }


  renderChart(data: any): void {
    // console.log('Rendering chart with data:', data);
    const years = Object.keys(data);
    const differences = years.map(year => parseInt(data[year].sales) - parseInt(data[year].purchases));
    const chartData = {
      labels: years,
      datasets: [{
        label: 'Marge',
        data: differences,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
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
    };
    this.chart = new Chart('margeChart', {
      type: 'pie',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: this.generateTitle(data),
          }
        }
      }
    });
  }

     generateTitle(data: any): string {
      let title = " ";
      const years = Object.keys(data);
      years.forEach(year => {
        const difference = parseInt(data[year].sales) - parseInt(data[year].purchases);
        const color = difference >= 0 ? 'green' : 'red'; // Use green for positive difference and red for negative difference
        title += `${year}:${difference}€  - `;
      });
      // Remove the trailing comma and space
      title = title.slice(0, -2);
      return title;
    }
    
}