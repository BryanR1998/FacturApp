import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { ProductAddComponent } from '../product-add/product-add.component';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';

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

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    NavbarComponent,
    ProductAddComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  // Inyectar Servicios
  private _productService: ProductsService = inject(ProductsService);
  private _router: Router = inject(Router);

  products$!: Observable<Product[]>;
  search = new FormControl('');

  ngOnInit(): void {
    // llamar Servicio getProducts
    // this._productService.getProduct().subscribe( (res) => console.log(res));

    this.products$ = this._productService.getProduct();
    this.search.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((search) => {
        // this._playerService.
        if (search) {
          console.log(search);
          this.products$ = this._productService.getProduct(search);
        } else {
          this.products$ = this._productService.getProduct();
        }
      });
  }

  editProduct(product: Product) {
    this._router.navigateByUrl(`products/edit/${product.id}`, { state: product });
  }

  deleteProduct(product: Product) {
    swalWithTailwindButtons.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: '¡No, cancela!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.deleteProduct(product.id);
        swalWithTailwindButtons.fire(
          '¡Eliminado!',
          `Tu producto ${product.name} ha sido eliminado.`,
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithTailwindButtons.fire(
          'Cancelado',
          `Tu archivo ${product.name} está seguro :)`,
          'error'
        )
      }
    })
  }

}
