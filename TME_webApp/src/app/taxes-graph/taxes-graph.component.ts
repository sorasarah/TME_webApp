import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'; // Import Chart from 'chart.js/auto'
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
    const averageTax = taxes.reduce((acc, curr) => acc + curr, 0) / taxes.length; // Calculate average tax

    // Prepare the data for the box chart
    const boxData = differences.map(diff => ({
      q1: Math.min(diff, 0),
      median: diff,
      q3: Math.max(diff, 0),
      whiskerMin: Math.min(diff, 0),
      whiskerMax: Math.max(diff, 0),
    }));

    // Render the box chart
    const ctx = document.getElementById('taxesChart');
    this.chart = new Chart(ctx as HTMLCanvasElement, {
      type: 'pie',
      data: {
        labels: years,
        datasets: [{
          label: 'Taxes',
          data: boxData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Taxes Box Chart'
          }
        }
      }
    });
  }
}
