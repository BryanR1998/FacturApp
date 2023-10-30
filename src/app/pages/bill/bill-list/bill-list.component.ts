import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BillCardComponent } from '../bill-card/bill-card.component';
import { Product } from 'src/app/interfaces/product.interface';
import { BillService } from '../../../services/bill/bill.service';
import { Bill } from '../../../interfaces/bill.interface';

// SweetAlert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

export const swalWithTailwindButtons = Swal.mixin({
  customClass: {
    confirmButton: 'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
    cancelButton: 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
  },
  buttonsStyling: false
})

import { Router } from '@angular/router';

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    BillCardComponent
  ],
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  private _billService: BillService = inject(BillService);
  private _router: Router = inject(Router);

  selectedProducts!: Product[];
  totalPrice: number = 0;

  ngOnInit(): void {
    this._billService.selectedItem$.subscribe((product) => {
      this.selectedProducts = product;
      this.calculateTotalPrice();
    })
  }

  calculateTotalPrice() {
    this.totalPrice = this.selectedProducts.reduce((total, product) => {
      return total + (product.price * product.stock);
    }, 0);
  }


  addBill() {
    const newBill: Bill = {
      id: new Date().getTime().toString(), // Firebase generará un ID único
      customerName: 'Ejemplo',
      phone: 1234567890,
      products: this.selectedProducts,
      totalPrice: this.totalPrice,
    };

    this._billService.addBill(newBill)
      .then(() => {
        console.log('Factura creada con ID:', newBill.id);
      })
      .catch((error) => {
        console.error('Error al crear la factura:', error);
      });
  }

}
