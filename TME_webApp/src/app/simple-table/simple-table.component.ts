import { ApiService } from './../services/api-data.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface ProductData {
  id: number;
  name: string;
  purchase_price: number;
  sold_price: number;
  quantity: number;
  description: string;
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

export class SimpleTableComponent implements AfterViewInit, OnInit {

  editedElements: ProductData[] = [];
  isAnyEdited: boolean = false;

  constructor(private apiService: ApiService) { }

  displayedColumns: string[] = ['name', 'purchase_price', 'sold_price', 'quantity', 'description', 'promotion_status', 'promotion_percent', 'promotion_price', 'sold_number'];
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
      window.location.reload();
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
      element.quantity = parseFloat(newValue);
      console.log('coucou')
    }
    if (fieldName === 'sold_price') {
      element.sold_price = parseFloat(newValue);
    }
    if (fieldName === 'promotion_percent') {
      element.promotion_percent = parseFloat(newValue);
      console.log('je suis dans percent promo')
    }
    if (fieldName === 'sold_number') {
      element.sold_number === parseFloat(newValue);
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
      window.alert('Un des champs comprends une valeur incorrect. Veuillez renseigner une valeur numérique ?');
    } else {
      this.onEditProduct()
    }

  }
  clearInput(event: any): void {
    event.target.innerText = '';
  }

  // Function cancel les modif
  OnCancel() {
    window.location.reload();
    console.log("j'annule la modif");
  }

}


