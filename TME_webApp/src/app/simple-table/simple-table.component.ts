import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export interface ProductData{
  name:string;
  purchase_price:number;
  sold_price: number;
  quantity:number;
  description:string;
  availability:boolean;


}
@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css'],
})

export class SimpleTableComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['name', 'purchase_price', 'sold_price', 'quantity', 'description','availability' ];
  dataSource = new MatTableDataSource<ProductData>(ELEMENT_DATA);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

  const ELEMENT_DATA: ProductData[] = [
    {
      name: 'Anchois',
      purchase_price: 6.99,
      sold_price: 0,
      quantity: 20,
      description: "Mediterranean anchovies",
      availability: false
  },
  {
      name: "Bar",
      purchase_price: 20.99,
      sold_price: 0,
      quantity: 45,
      description: "Wild sea bass from Brittany",
      availability: false
  },
  {
      name: "Dorade",
      purchase_price: 12.99,
      sold_price: 0,
      quantity: 25,
      description: "Mediterranean sea bream",
      availability: false
  },
  {
      name: "Espadon",
      purchase_price: 17.99,
      sold_price: 0,
      quantity: 15,
      description: "Fresh swordfish",
      availability: false
  },
  {
      name: "Maquereau",
      purchase_price: 7.99,
      sold_price: 0,
      quantity: 60,
      description: "Fresh mackerel caught off the coast",
      availability: true
  },
  {
      name: "Morue",
      purchase_price: 11.99,
      sold_price: 0,
      quantity: 35,
      description: "Atlantic cod for traditional fish and chips",
      availability: true
  },            
  {
      name: "Saumon",
      purchase_price: 15.99,
      sold_price: 12.99,
      quantity: 50,
      description: "Fresh Atlantic salmon fillets",
      availability: false
  },
  {
      name: "Sole",
      purchase_price: 18.99,
      sold_price: 0,
      quantity: 30,
      description: "Dover sole from the English Channel",
      availability: false
  },
  {
      name: "Thon",
      purchase_price: 14.99,
      sold_price: 0,
      quantity: 55,
      description: "Yellowfin tuna steaks",
      availability: true
  },
  {
      name: "Truite",
      purchase_price: 10.49,
      sold_price: 8.99,
      quantity: 40,
      description: "Rainbow trout from local rivers",
      availability: false
  },
  {
    "name": "Crevettes",
    "purchase_price": 15.99,
    "sold_price": 12.99,
    "quantity": 50,
    "description": "Crevettes fraîches de la côte atlantique",
    "availability": true
},
{
    "name": "Huîtres",
    "purchase_price": 10.49,
    "sold_price": 8.99,
    "quantity": 40,
    "description": "Huîtres spéciales de Bretagne",
    "availability": false
},
{
    "name": "Coquilles Saint-Jacques",
    "purchase_price": 18.99,
    "sold_price": 0,
    "quantity": 30,
    "description": "Délicieuses coquilles Saint-Jacques fraîches",
    "availability": false
},
{
    "name": "Moules",
    "purchase_price": 7.99,
    "sold_price": 0,
    "quantity": 60,
    "description": "Moules fraîches de la baie de Mont-Saint-Michel",
    "availability": true
},
{
    "name": "Langoustines",
    "purchase_price": 12.99,
    "sold_price": 0,
    "quantity": 25,
    "description": "Langoustines fraîches pêchées au large",
    "availability": false
},
{
    "name": "Palourdes",
    "purchase_price": 11.99,
    "sold_price": 0,
    "quantity": 35,
    "description": "Palourdes fraîches de Normandie",
    "availability": true
},
{
    "name": "Bigorneaux",
    "purchase_price": 20.99,
    "sold_price": 0,
    "quantity": 45,
    "description": "Bigorneaux fraîchement pêchés sur la côte",
    "availability": false
},
{
    "name": "Crabes",
    "purchase_price": 6.99,
    "sold_price": 0,
    "quantity": 20,
    "description": "Crabes frais de l'océan Atlantique",
    "availability": false
},
{
    "name": "Homards",
    "purchase_price": 14.99,
    "sold_price": 0,
    "quantity": 55,
    "description": "Homards fraîchement pêchés dans les eaux côtières",
    "availability": true
},
{
    "name": "Saint-Pierre",
    "purchase_price": 17.99,
    "sold_price": 0,
    "quantity": 15,
    "description": "Saint-Pierre sauvage de la Manche",
    "availability": false
},
{
  "name": "Crevettes géantes",
  "purchase_price": 15.99,
  "sold_price": 12.99,
  "quantity": 50,
  "description": "Crevettes géantes fraîches de la mer du Nord",
  "availability": true
},
{
  "name": "Homard breton",
  "purchase_price": 10.49,
  "sold_price": 8.99,
  "quantity": 40,
  "description": "Homard breton de qualité supérieure",
  "availability": false
},
{
  "name": "Crabe des neiges",
  "purchase_price": 18.99,
  "sold_price": 0,
  "quantity": 30,
  "description": "Crabe des neiges frais pêché dans les eaux froides",
  "availability": false
},
{
  "name": "Langoustines",
  "purchase_price": 7.99,
  "sold_price": 0,
  "quantity": 60,
  "description": "Langoustines fraîches de la côte bretonne",
  "availability": true
},
{
  "name": "Écrevisses",
  "purchase_price": 12.99,
  "sold_price": 0,
  "quantity": 25,
  "description": "Écrevisses fraîches de rivière",
  "availability": false
},
{
  "name": "Crevettes roses",
  "purchase_price": 11.99,
  "sold_price": 0,
  "quantity": 35,
  "description": "Crevettes roses fraîches de Méditerranée",
  "availability": true
},
{
  "name": "Tourteau",
  "purchase_price": 20.99,
  "sold_price": 0,
  "quantity": 45,
  "description": "Tourteau fraîchement pêché sur les côtes",
  "availability": false
},
{
  "name": "Crabe royal",
  "purchase_price": 6.99,
  "sold_price": 0,
  "quantity": 20,
  "description": "Crabe royal des eaux froides de l'océan Pacifique",
  "availability": false
},
{
  "name": "Crevettes tigrées",
  "purchase_price": 14.99,
  "sold_price": 0,
  "quantity": 55,
  "description": "Crevettes tigrées géantes de l'Asie du Sud-Est",
  "availability": true
},
{
  "name": "Homard européen",
  "purchase_price": 17.99,
  "sold_price": 0,
  "quantity": 15,
  "description": "Homard européen de la Manche",
  "availability": false
}

]
