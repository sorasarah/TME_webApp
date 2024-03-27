import { ApiService } from './../services/api-data.service';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartItem } from 'chart.js/auto';

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
  startDate: Date = new Date(); // Initialise avec la date d'aujourd'hui
  endDate: Date = new Date(); // Initialise avec la date d'aujourd'hui

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadData();
     this.startDate.setDate(this.endDate.getMonth()-1);
    // this.endDate.setDate(this.endDate.getDate()+7);
  }

  loadData(): void {
    this.apiService.getTransData().subscribe(
      (res: TransactionData[]) => {
        // console.log('Transaction API Response:', res);
        const filteredData = this.filterDataByDateRange(res);
        const aggregatedData = this.aggregateData(filteredData);
        this.renderChart(aggregatedData);
      },
      (error: any) => {
        console.error('Transaction API Error:', error);
      }
    );
  }
  
  filterDataByDateRange(data: TransactionData[]): TransactionData[] {
    // Filtrer les données en fonction de la plage de dates
    // console.log("data :", data);
    let filteredDatas = data.filter(entry => {
      const entryDate = new Date(entry.add_date);
      return entryDate >= this.startDate && entryDate <= this.endDate;
    });
    // console.log(this.startDate);
    // console.log(filteredDatas);
    const totalPurchasePrice = this.aggregatePurchaseSoldPrices(filteredDatas);
    // console.log("Total purchase price:", totalPurchasePrice);

    return filteredDatas;
  }
  
  aggregateData(data: any[]): any {
    const aggregated: { [year: number]: { [month: number]: { [day: number]: { purchases: number, sales: number } } } } = {};
    data.forEach(entry => {
        const date = new Date(entry.add_date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        aggregated[year] = aggregated[year] || {};
        aggregated[year][month] = aggregated[year][month] || {};
        aggregated[year][month][day] = aggregated[year][month][day] || { purchases: 0, sales: 0 };
      
        if (entry.transaction === '1') {
            aggregated[year][month][day].purchases += parseFloat(entry.transaction_price);
        } else if (entry.transaction === '0') {
            aggregated[year][month][day].sales += parseFloat(entry.transaction_price);
        }
    });
    return aggregated;
  }

  renderChart(data: any): void {
    if (this.chart) {
      this.chart.destroy(); // Détruire l'instance du graphique existant
    }
    // Extraire les données d'achats et de ventes des données agrégées
    const labels = [];
    const purchasesData = [];
    const salesData = [];
    
   
    // Parcourir les données agrégées et pousser les valeurs dans les tableaux respectifs
    for (const year in data) {
      for (const month in data[year]) {
        for (const day in data[year][month]) {
          labels.push(`${year}-${month}-${day}`);
          purchasesData.push(data[year][month][day].purchases);
          salesData.push(data[year][month][day].sales);
        }
      }
    }
    console.log(purchasesData)
    // Rendre le graphique ici en utilisant Chart.js
    const ctx = document.getElementById('transactionChart');
    this.chart = new Chart(ctx as ChartItem, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Purchases',
          data: purchasesData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }, {
          label: 'Sales',
          data: salesData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
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

  applyDateFilter(): void {
    this.loadData(); // Recharger les données en fonction de la nouvelle plage de dates
  }

  getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((date.getTime() - firstDayOfYear.getTime()) / 86400000);
    return Math.ceil((dayOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  // calcul du chiffre d'affaire
  aggregatePurchaseSoldPrices(data: TransactionData[]): number {
    let totalPurchasePrice = 0;
    let totalSoldPrice = 0;
    data.forEach(entry => {
      if (entry.transaction === '1') {
        totalPurchasePrice += entry.transaction_price;
        // console.log(totalPurchasePrice)
      }
      if (entry.transaction === '0') {
        totalSoldPrice += entry.transaction_price;
      }
    });
    return totalPurchasePrice;
  }
}

