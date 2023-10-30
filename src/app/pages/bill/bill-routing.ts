import { Routes } from "@angular/router";
import { BillListComponent } from "./bill-list/bill-list.component";


export const BillRoutes: Routes = [
  { path: 'list', component: BillListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
]
