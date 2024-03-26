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
  selector: 'app-taxes-graph',
  templateUrl: './taxes-graph.component.html',
  styleUrls: ['./taxes-graph.component.css']
})
export class TaxesGraphComponent implements OnInit {
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
        const aggregatedData = this.aggregateData(this.transactionType);
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
      const date = new Date(entry.add_date);
      const year = date.getFullYear();
      if (!aggregated[year]) {
        aggregated[year] = { purchases: 0, sales: 0 };
      }
      if (entry.transaction === '1') {
        aggregated[year].purchases += parseFloat(entry.transaction_price);
      } else if (entry.transaction === '0') {
        aggregated[year].sales += parseFloat(entry.transaction_price);
      }
    });
    return aggregated;
  }

  renderChart(data: any): void {
    const years = Object.keys(data);
    const differences = years.map(year => parseInt(data[year].sales) - parseInt(data[year].purchases));
    const taxes = differences.map(diff => Math.abs(diff) * 0.3); // Calculate taxes as 30% of the absolute difference
    const chartData = {
      labels: years,
      datasets: [{
        label: 'Impots annuel',
        data: taxes,
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
    this.chart = new Chart('taxesChart', {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            // display: true,
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
      const taxes = Math.abs(difference) * 0.3; // Calculate taxes as 30% of the absolute difference
      const color = difference >= 0 ? 'green' : 'red';
      title += `${year}: Taxes - ${taxes.toFixed(2)}€, `;
    });
    title = title.slice(0, -2);
    return title;
  }
}