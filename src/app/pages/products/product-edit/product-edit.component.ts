import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { Product } from '../../../interfaces/product.interface';

// Swetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent
  ],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  private _location: Location = inject(Location);
  private _productService: ProductsService = inject(ProductsService);
  private _router: Router = inject(Router);

  product!: Product;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    stock: new FormControl(0, Validators.required),
    info: new FormControl('', Validators.required),
  });

  ngOnInit(): void {

    this.product = this._location.getState() as Product;
    console.log(this.product);

    this.form.patchValue(this.product);
  }

  updateProduct() {
    this._productService.updatePlayer({
      id: this.product.id,
      ...this.form.getRawValue()
    } as Product);

    // Alerta
    Swal.fire(
      '¡Producto Actualizado!',
      `${this.product.name} actualizado correctamente.`,
      'success')
    .then((result) => {
      if (result.isConfirmed) {
        // Redirige al usuario a la página deseada después del inicio de sesión
        this._router.navigate(['products']);
      }
    });
  }

}
