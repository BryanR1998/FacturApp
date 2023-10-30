import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interfaces/product.interface';
import { ProductsService } from '../../../services/products/products.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';
import { BillService } from '../../../services/bill/bill.service';

@Component({
  selector: 'app-bill-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.css']
})
export class BillCardComponent implements OnInit {

  private _productService: ProductsService = inject(ProductsService);
  private _billService: BillService = inject(BillService);

  products$!: Observable<Product[]>;

  search = new FormControl('');

  ngOnInit(): void {

    // Consultamos el producto por el nombre
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

  selectProduct(product: Product) {
    this._billService.setSelectedProduct(product);
  }

}
