import { Component, OnInit  } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-marge-graph',
  templateUrl: './marge-graph.component.html',
  styleUrls: ['./marge-graph.component.css']
})
export class MargeGraphComponent implements OnInit {
  chart: any;

  constructor() { }

  ngOnInit(): void {
    this.fetchDataAndRenderChart();
  }

  fetchDataAndRenderChart(): void {
    const jsonData = [ 
      { "transaction_type": "purchase", "date": "2023-01-01", "amount": 500 },
      { "transaction_type": "sale", "date": "2022-01-05", "amount": 300 },
      { "transaction_type": "sale", "date": "2023-01-10", "amount": 700 },
      { "transaction_type": "purchase", "date": "2023-01-15", "amount": 400 },
      { "transaction_type": "sale", "date": "2024-01-20", "amount": 600 },
      { "transaction_type": "purchase", "date": "2023-03-01", "amount": 500 },
      { "transaction_type": "sale", "date": "2022-03-05", "amount": 300 },
      { "transaction_type": "sale", "date": "2023-09-10", "amount": 700 },
      { "transaction_type": "purchase", "date": "2024-01-15", "amount": 400 },
      { "transaction_type": "sale", "date": "2024-07-20", "amount": 600 }
    ];
    const aggregatedData = this.aggregateData(jsonData);
    this.renderChart(aggregatedData);
  }

  aggregateData(data: any[]): any {
    const aggregated: { [year: number]: { purchases: number, sales: number } } = {};
    data.forEach(entry => {
      const date = new Date(entry.date);
      const year = date.getFullYear();
      if (!aggregated[year]) {
        aggregated[year] = { purchases: 0, sales: 0 };
      }
      if (entry.transaction_type === 'purchase') {
        aggregated[year].purchases += entry.amount;
      } else if (entry.transaction_type === 'sale') {
        aggregated[year].sales += entry.amount;
      }
    });
    return aggregated;
  }

  renderChart(data: any): void {
    console.log('Rendering chart with data:', data);
    const years = Object.keys(data);
    const differences = years.map(year => data[year].sales - data[year].purchases);
    const chartData = {
      labels: years,
      datasets: [{
        label: 'Difference (Sales - Purchases)',
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
            text: 'Difference Between Sales and Purchases by Year'
          }
        }
      }
    });
  }
}