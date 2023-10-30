import { Injectable, inject } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Bill } from '../../interfaces/bill.interface';
import { deleteDoc, getDocs, runTransaction } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private selectedProductSource = new BehaviorSubject<Product[]>([]);
  selectedItem$ = this.selectedProductSource.asObservable();
  constructor(private firestore: Firestore) {}

  // Servicio para agregar un producto a una factura

  private billRef = collection(this.firestore, 'bills');
  private productRef = collection(this.firestore, 'products');

  async deleteProduct(id: string) {
    const productRef = collection(this.firestore, 'products');
    let q = query(productRef, where('id', '==', id));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'products', document.id);
      await deleteDoc(docRef);
    });

  }

  async addBill(bill: Bill) {
    return runTransaction(this.firestore, async (transaction) => {
      const productsToUpdate = [];

      for (const product of bill.products) {
        const productDocRef = doc(this.productRef, product.id);
        const productDoc = await getDoc(productDocRef);

        if (!productDoc.exists()) {
          throw new Error('Producto no encontrado.');
        }

        const currentStock = productDoc.data()['stock'];

        if (currentStock < product.stock) {
          throw new Error('No hay suficiente stock para uno o más productos.');
        }

        const newStock = currentStock - product.stock;
        productsToUpdate.push({ ref: productDocRef, stock: newStock });
      }

      // Actualizar el stock de los productos dentro de la transacción
      for (const productToUpdate of productsToUpdate) {
        await updateDoc(productToUpdate.ref, { stock: productToUpdate.stock });
      }

      // Crear la factura una vez que los productos se hayan actualizado
      await addDoc(this.billRef, bill);
    });
  }

  setSelectedProduct(product: Product) {
    const currentProducts = this.selectedProductSource.value;
    currentProducts.push(product);
    this.selectedProductSource.next(currentProducts);
  }



}
