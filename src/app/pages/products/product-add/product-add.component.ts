import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';
import { Product } from '../../../interfaces/product.interface';

// Swetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {

  private _productService: ProductsService = inject(ProductsService);
  private _router: Router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    stock: new FormControl(0, Validators.required),
    info: new FormControl('', Validators.required),
  });


  addProduct() {
    this._productService.addProduct({
      id: new Date().getTime().toString(),
      ...this.form.getRawValue(),
    } as Product);
    Swal.fire(
      '¡Nuevo Producto Añadido!',
      `ingresado correctamente.`,
      'success')
    .then((result) => {
      if (result.isConfirmed) {
        // Redirige al usuario a la página deseada después del inicio de sesión
        this._router.navigate(['products']);
      }
    });
  }
}
