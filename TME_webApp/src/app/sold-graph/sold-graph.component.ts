import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-sold-graph',
  templateUrl: './sold-graph.component.html',
  styleUrls: ['./sold-graph.component.css']
})
export class SoldGraphComponent implements OnInit {
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
    const aggregated: { [year: number]: { [month: number]: { [week: number]: { [day: number]: { purchases: number, sales: number } } } } } = {};
    data.forEach(entry => {
        const date = new Date(entry.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const week = this.getWeekNumber(date);
        const day = date.getDate();

        aggregated[year] = aggregated[year] || {};
        aggregated[year][month] = aggregated[year][month] || {};
        aggregated[year][month][week] = aggregated[year][month][week] || {};
        aggregated[year][month][week][day] = aggregated[year][month][week][day] || { purchases: 0, sales: 0 };

        if (entry.transaction_type === 'purchase') {
            aggregated[year][month][week][day].purchases += entry.amount;
        } else if (entry.transaction_type === 'sale') {
            aggregated[year][month][week][day].sales += entry.amount;
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


//chart1:CA----------- vente:"50";par jour,par semaine, par mois, par ans
//chart2: Marge------------- pour un ans total ventes moins total achat
//chart2: impot ------------ si marge est plus grand que 0 marge*30 %

