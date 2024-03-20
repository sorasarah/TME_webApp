<<<<<<< HEAD
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';

export interface ProductData {
  date: string | number | Date;
=======
import { ApiService } from './../services/api-data.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface ProductData {
  id: number;
>>>>>>> d02b7db101a269d88d2d948efc9e330e1cf51dd7
  name: string;
  purchase_price: number;
  sold_price: number;
  quantity: number;
  description: string;
  availability: boolean;
  promotion_status: boolean;
  promotion_price: number;
  promotion_percent: number;
  sold_number: number;
  category: string;
  // editable: boolean;
  isEdited?: boolean;

}

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css'],
})

<<<<<<< HEAD
export class SimpleTableComponent implements AfterViewInit,OnInit {
  
  constructor(private apiService: ApiService) { }
=======
export class SimpleTableComponent implements AfterViewInit, OnInit {
>>>>>>> d02b7db101a269d88d2d948efc9e330e1cf51dd7

  editedElements: ProductData[] = [];
  isAnyEdited: boolean = false;

  constructor(private apiService: ApiService) { }

  displayedColumns: string[] = ['name', 'purchase_price', 'sold_price', 'quantity', 'description', 'availability', 'promotion_status', 'promotion_percent', 'promotion_price', 'sold_number'];
  dataSource = new MatTableDataSource<ProductData>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.apiService.getData().subscribe(
      (response) => {
        console.log('API Response:', response);
<<<<<<< HEAD
        // Handle response data
        this.dataSource.data = response;
      },
      (error) => {
        console.error('API Error:', error);
        // Handle error
      }
    );
  }



  applyFilter(category: string | null) {
    console.log("hello filter");
    if (category != null) {
      this.dataSource.filterPredicate = (data: ProductData) => {
        return data.category === category;
      };
      this.dataSource.filter = this.dataSource.toString();
    } else {
      // Clear the filter
      this.dataSource.filterPredicate = () => true;
      this.dataSource.filter = '';
    }
  }
}

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
=======
        this.dataSource.data = response.map((element: ProductData) => {
          return { ...element, } //editable: true };
        });
        // this.dataSource.data = response;
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  // Filtre par catégory
  applyFilter(category: string | null) {
    // console.log("hello filter");
    if (category != null) {
      this.dataSource.filterPredicate = (data: ProductData) => {
        return data.category === category;
      };
      this.dataSource.filter = this.dataSource.toString();
    } else {
      // Clear the filter
      this.dataSource.filterPredicate = () => true;
      this.dataSource.filter = '';
    }
  }

  updateProduct(newData: any[]) {
    this.apiService.updateData(newData).subscribe(response => {
      console.log('Product updated successfully:', response);
      // Mettre à jour les données locales si nécessaire
    }, error => {
      console.error('Error updating product:', error);
    });
  }

  // Fonction éditer après avoir cliqué sur un champs éditable
  editField(event: any, element: ProductData, fieldName: string) {
    // Désactivez la propagation de l'événement pour éviter les interactions indésirables
    event.stopPropagation();

    // Obtenez la nouvelle valeur du champ
    const newValue = event.target.innerText;

    // Mettez à jour le champ correspondant dans l'objet élément
    if (fieldName === 'quantity') {

      //je vérifie si la qunatité est inférieur à la précédente
      if (parseFloat(newValue) < element.quantity) {
        const difference = element.quantity - parseFloat(newValue);
        element.sold_number += difference;
        console.log('je suis dans la différence')
      }

      element.quantity = parseFloat(newValue);
      console.log('je suis dans quantity')

      
    } 
    if (fieldName === 'sold_price') {
      element.sold_price = parseFloat(newValue);
      console.log('je suis dans sold_price')
    } 
    if (fieldName === 'promotion_percent') {
      element.promotion_percent = parseFloat(newValue);
      console.log('je suis dans promotion_percent')
      // Mise à jour du promotion_status
      if (element.promotion_percent === 0) {
        // Mettez à jour promotion_price
        element.promotion_price = element.sold_price * (element.promotion_percent / 100);
        console.log(element.promotion_price)
        console.log('je suis dans maj promotion_price')
        // Mettez à jour promotion_status à true
        element.promotion_status = true;
      } else {
        element.promotion_status = false;
        console.log('je reste avec le statut false')
      }

    }
    if (fieldName === 'promotion_price') {
      element.promotion_price = parseFloat(newValue);
      console.log('je suis dans promotion_price')
    } 
    if (fieldName === 'sold_number') {
      element.sold_number === parseFloat(newValue);
      console.log('je suis dans sold_number')
    } 
    if (fieldName === 'promotion_status') {
      element.promotion_status = newValue.toLowerCase() === 'true';
      console.log('je suis dans statut promotion changé à true')
    }

    // Si l'élément n'est pas déjà dans editedElements, ajoutez-le
    if (!this.editedElements.includes(element)) {
      this.editedElements.push(element);
    }

    // Changement de couleur si édition
    element.isEdited = true;
    this.dataSource.data.forEach(item => {
      if (item !== element) {
        item.isEdited = false;
      }
    });
    // Active le bouton annuler s'il y a une modification
    this.isAnyEdited = this.editedElements.some(element => element.isEdited);
  }

  // Fonction edit d'un produit 
  onEditProduct() {
    // on parcours le tableaux des éléments modifiés map permet de dupliquer le tableau afin d'éviter les soucis d'asynchrone
    this.updateProduct(this.editedElements.map(a => ({ ...a })))
    // Une fois les modifications envoyées, videz la liste editedElements
    this.editedElements = [];
  }

  OnBlurField(event: any, element: ProductData, fieldName: string) {
    const newValue = event.target.innerText;

    if (isNaN(parseFloat(newValue))) {
      window.alert('Un des champs comprends une valeur incorrect. Veuillez renseigner une valeur numérique !');
    } else {
      console.log('je suis dans le else de blur')
      this.onEditProduct()
    }

    
  }

  // Function cancel les modif
  OnCancel() {
    window.location.reload();
    console.log("j'annule la modif");
  }

}

>>>>>>> d02b7db101a269d88d2d948efc9e330e1cf51dd7
