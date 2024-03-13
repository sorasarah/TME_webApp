import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

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

export class SimpleTableComponent implements AfterViewInit {
  
  constructor(private http: HttpClient) { }
  

  displayedColumns: string[] = ['name', 'purchase_price', 'sold_price', 'quantity', 'description', 'availability'];
  dataSource = new MatTableDataSource<ProductData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.http.get<any>('http://127.0.0.1:8000/productsList/').subscribe(
      (data) => {
        // Assuming your API response is an array of products
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}

//   applyFilter(category: string | null) {
//     console.log("hello filter");
//     if (category != null) {
//       this.dataSource.filterPredicate = (data: ProductData) => {
//         return data.category === category;
//       };
//       this.dataSource.filter = ELEMENT_DATA.toString();
//     } else {
//       // Clear the filter
//       this.dataSource.filterPredicate = () => true;
//       this.dataSource.filter = '';
//     }
//   }
// }

// const ELEMENT_DATA: ProductData[] = [
//   {
//     name: 'Anchois',
//     category: '0',
//     purchase_price: 6.99,
//     sold_price: 0,
//     quantity: 20,
//     description: "Mediterranean anchovies",
//     availability: false
//   },
//   {
//     name: "Palourdes",
//     category: '1',
//     purchase_price: 11.99,
//     sold_price: 0,
//     quantity: 35,
//     description: "Palourdes fraîches de Normandie",
//     availability: true
//   },
//   {
//     name: "Bigorneaux",
//     category: '1',
//     purchase_price: 20.99,
//     sold_price: 0,
//     quantity: 45,
//     description: "Bigorneaux fraîchement pêchés sur la côte",
//     availability: false
//   },
//   {
//     name: "Crabes",
//     category: '1',
//     purchase_price: 6.99,
//     sold_price: 0,
//     quantity: 20,
//     description: "Crabes frais de l'océan Atlantique",
//     availability: false
//   },
//   {
//     name: "Homards",
//     category: '1',
//     purchase_price: 14.99,
//     sold_price: 0,
//     quantity: 55,
//     description: "Homards fraîchement pêchés dans les eaux côtières",
//     availability: true
//   },
//   {
//     name: "Saint-Pierre",
//     category: '1',
//     purchase_price: 17.99,
//     sold_price: 0,
//     quantity: 15,
//     description: "Saint-Pierre sauvage de la Manche",
//     availability: false
//   },
//   {
//     name: "Bar",
//     category: '0',
//     purchase_price: 20.99,
//     sold_price: 0,
//     quantity: 45,
//     description: "Wild sea bass from Brittany",
//     availability: false
//   },
//   {
//     name: "Dorade",
//     category: '0',
//     purchase_price: 12.99,
//     sold_price: 0,
//     quantity: 25,
//     description: "Mediterranean sea bream",
//     availability: false
//   },
//   {
//     name: "Espadon",
//     category: '0',
//     purchase_price: 17.99,
//     sold_price: 0,
//     quantity: 15,
//     description: "Fresh swordfish",
//     availability: false
//   },
//   {
//     name: "Maquereau",
//     category: '0',
//     purchase_price: 7.99,
//     sold_price: 0,
//     quantity: 60,
//     description: "Fresh mackerel caught off the coast",
//     availability: true
//   },
//   {
//     name: "Morue",
//     category: '0',
//     purchase_price: 11.99,
//     sold_price: 0,
//     quantity: 35,
//     description: "Atlantic cod for traditional fish and chips",
//     availability: true
//   },
//   {
//     name: "Crevettes roses",
//     category: '2',
//     purchase_price: 11.99,
//     sold_price: 0,
//     quantity: 35,
//     description: "Crevettes roses fraîches de Méditerranée",
//     availability: true
//   },
//   {
//     name: "Tourteau",
//     category: '2',
//     purchase_price: 20.99,
//     sold_price: 0,
//     quantity: 45,
//     description: "Tourteau fraîchement pêché sur les côtes",
//     availability: false
//   },
//   {
//     name: "Crabe royal",
//     category: '2',
//     purchase_price: 6.99,
//     sold_price: 0,
//     quantity: 20,
//     description: "Crabe royal des eaux froides de l'océan Pacifique",
//     availability: false
//   },
//   {
//     name: "Crevettes tigrées",
//     category: '2',
//     purchase_price: 14.99,
//     sold_price: 0,
//     quantity: 55,
//     description: "Crevettes tigrées géantes de l'Asie du Sud-Est",
//     availability: true
//   },
//   {
//     name: "Homard européen",
//     category: '2',
//     purchase_price: 17.99,
//     sold_price: 0,
//     quantity: 15,
//     description: "Homard européen de la Manche",
//     availability: false
//   },
//   {
//     name: "Saumon",
//     category: '0',
//     purchase_price: 15.99,
//     sold_price: 12.99,
//     quantity: 50,
//     description: "Fresh Atlantic salmon fillets",
//     availability: false
//   },
//   {
//     name: "Sole",
//     category: '0',
//     purchase_price: 18.99,
//     sold_price: 0,
//     quantity: 30,
//     description: "Dover sole from the English Channel",
//     availability: false
//   },
//   {
//     name: "Thon",
//     category: '0',
//     purchase_price: 14.99,
//     sold_price: 0,
//     quantity: 55,
//     description: "Yellowfin tuna steaks",
//     availability: true
//   },
//   {
//     name: "Truite",
//     category: '0',
//     purchase_price: 10.49,
//     sold_price: 8.99,
//     quantity: 40,
//     description: "Rainbow trout from local rivers",
//     availability: false
//   },
//   {
//     name: "Crevettes",
//     category: '1',
//     purchase_price: 15.99,
//     sold_price: 12.99,
//     quantity: 50,
//     description: "Crevettes fraîches de la côte atlantique",
//     availability: true
//   },
//   {
//     name: "Huîtres",
//     category: '1',
//     purchase_price: 10.49,
//     sold_price: 8.99,
//     quantity: 40,
//     description: "Huîtres spéciales de Bretagne",
//     availability: false
//   },
//   {
//     name: "Coquilles Saint-Jacques",
//     category: '1',
//     purchase_price: 18.99,
//     sold_price: 0,
//     quantity: 30,
//     description: "Délicieuses coquilles Saint-Jacques fraîches",
//     availability: false
//   },
//   {
//     name: "Moules",
//     category: '1',
//     purchase_price: 7.99,
//     sold_price: 0,
//     quantity: 60,
//     description: "Moules fraîches de la baie de Mont-Saint-Michel",
//     availability: true
//   },
//   {
//     name: "Langoustines",
//     category: '1',
//     purchase_price: 12.99,
//     sold_price: 0,
//     quantity: 25,
//     description: "Langoustines fraîches pêchées au large",
//     availability: false
//   },
//   {
//     name: "Crevettes géantes",
//     category: '2',
//     purchase_price: 15.99,
//     sold_price: 12.99,
//     quantity: 50,
//     description: "Crevettes géantes fraîches de la mer du Nord",
//     availability: true
//   },
//   {
//     name: "Homard breton",
//     category: '2',
//     purchase_price: 10.49,
//     sold_price: 8.99,
//     quantity: 40,
//     description: "Homard breton de qualité supérieure",
//     availability: false
//   },
//   {
//     name: "Crabe des neiges",
//     category: '2',
//     purchase_price: 18.99,
//     sold_price: 0,
//     quantity: 30,
//     description: "Crabe des neiges frais pêché dans les eaux froides",
//     availability: false
//   },
//   {
//     name: "Langoustines",
//     category: '2',
//     purchase_price: 7.99,
//     sold_price: 0,
//     quantity: 60,
//     description: "Langoustines fraîches de la côte bretonne",
//     availability: true
//   },
//   {
//     name: "Écrevisses",
//     category: '2',
//     purchase_price: 12.99,
//     sold_price: 0,
//     quantity: 25,
//     description: "Écrevisses fraîches de rivière",
//     availability: false
//   }


// ]
