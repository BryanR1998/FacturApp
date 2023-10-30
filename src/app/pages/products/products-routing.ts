import { Routes } from "@angular/router";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAddComponent } from "./product-add/product-add.component";

export const ProductsRoutes: Routes = [
  { path: 'list', component: ProductListComponent },
  { path: 'add', component: ProductAddComponent },
  { path: 'edit/:id', component: ProductEditComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
]
