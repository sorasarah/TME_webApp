import { Component, OnInit  } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from './../services/api-data.service';

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
    this.fetchDataAndRenderChart();
  }

  fetchDataAndRenderChart(): void {
    this.apiService.getTransData().subscribe(
      (data) => {
        // console.log('Transaction API Response:', data);
        this.transactionType = data;
        const aggregatedData = this.aggregateData(this.transactionType);
        this.renderChart(aggregatedData);
      },
      (error) => {
        console.error('Transaction API Error:', error);
      }
    );
  }

  aggregateData(data: any[]): any {
    const aggregated: { [year: number]: { purchases: number, sales: number } } = {};
    data.forEach(entry => {
      const date = new Date(entry.date);
      const year = date.getFullYear();
      console.log("year", year)
      if (!aggregated[year]) {
        aggregated[year] = { purchases: 0, sales: 0 };
      }

      if (entry.transaction === '1') {
        aggregated[year].purchases += parseFloat(entry.transaction_price);
      } else if (entry.transaction === '0') {
        aggregated[year].sales += parseFloat(entry.transaction_price);
        // aggregated[year].CA += parseFloat(entry.transaction_price);
      }
      // console.log("tran vente", aggregated[year].sales, aggregated[year].CA);
      // console.log("tran achat", aggregated[year].purchases);
    });

    // Calculate Marge (difference)
    // Object.keys(aggregated).forEach(year => {
    //   aggregated[parseInt(year)].Marge = aggregated[parseInt(year)].sales - aggregated[parseInt(year)].purchases;
    //   console.log(aggregated[parseInt(year)].Marge)
    // });

    return aggregated;
  }

  renderChart(data: any): void {
    console.log('Rendering chart with data:', data);
    const years = Object.keys(data);
    const differences = years.map(year => data[year].sales - data[year].purchases);
    // const diffValue = parseInt(differences[])
    // const taxe = (30 * differences ) / 100
    const chartData = {
      labels: years,
      datasets: [{
        label: 'Marge €',
        data: differences,
        backgroundColor: [
          // 'rgba(255, 99, 132, 0.5)', //pink
          // 'rgba(54, 162, 235, 0.5)', //blue
          // 'rgba(255, 206, 86, 0.5)', //yellow
          // 'rgba(75, 192, 192, 0.5)', //green
          'rgba(153, 102, 255, 0.5)', //purple
          // 'rgba(255, 159, 64, 0.5)' //orange
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', //pink
          // 'rgba(54, 162, 235, 1)', //blue
          // 'rgba(255, 206, 86, 1)', //yellow
          // 'rgba(75, 192, 192, 1)', //green
          // 'rgba(153, 102, 255, 1)', //purple
          // 'rgba(255, 159, 64, 1)' //orange
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
            text: 'somme des ventes - sommes des achats'
          }
        }
      }
    });
  }
}