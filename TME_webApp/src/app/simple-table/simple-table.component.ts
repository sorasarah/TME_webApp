import { ApiService } from './../services/api-data.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface ProductData {
  id: number;
  name: string;
  category: string;
  purchase_price: number;
  sold_price: number;
  quantity: number;
  description: string;
  availability: boolean;
  editable: boolean; 
  isEdited?: boolean;

}

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.css'],
})

export class SimpleTableComponent implements AfterViewInit, OnInit {
  
  editedElements: ProductData[] = [];

  constructor(private apiService: ApiService) { }

  displayedColumns: string[] = ['name', 'purchase_price', 'sold_price', 'quantity', 'description', 'availability'];
  dataSource = new MatTableDataSource<ProductData>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.apiService.getData().subscribe(
      (response) => {
        console.log('API Response:', response);
        this.dataSource.data = response.map((element: ProductData) => {
          return {...element, editable: true};
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

  updateProduct(id: number, newData: any) {
    this.apiService.updateData(id, newData).subscribe(response => {
      console.log('Product updated successfully:', response);
      // Mettre à jour les données locales si nécessaire
    }, error => {
      console.error('Error updating product:', error);
    });
  }

  // Fonction edit d'un produit 
  onEditProduct(product: ProductData = {} as ProductData) {
    // on parcours le tableaux des éléments modifiés
    this.editedElements.forEach(product => {
      // on vérifie si l'élément a été modifié
      if(product.isEdited){
        this.updateProduct(product.id, { quantity: product.quantity, sold_price: product.sold_price });
      }
      console.log("Element modifié :", product);
    });
    // Une fois les modifications envoyées, videz la liste editedElements
    this.editedElements = [];
  }

  // Fonction éditer après avoir cliqué sur un champs éditable
  editField(event: any, element: ProductData, fieldName: string) {
    // Désactivez la propagation de l'événement pour éviter les interactions indésirables
    event.stopPropagation();
  
    // Obtenez la nouvelle valeur du champ
    const newValue = event.target.innerText;
  
    // Mettez à jour le champ correspondant dans l'objet élément
    if (fieldName === 'quantity') {
      element.quantity = parseFloat(newValue);
    } else if (fieldName === 'sold_price'){
      element.purchase_price = parseFloat(newValue)
    }

    if (!this.editedElements.includes(element)) {
      this.editedElements.push(element);
    }

    element.isEdited = true;
    // this.dataSource.data.forEach(item => {
    //   if (item !== element) {
    //     item.isEdited = false;
    //   }
    // });
  }

}

