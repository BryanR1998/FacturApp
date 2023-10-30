import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Product } from '../../interfaces/product.interface';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Definir servicio firestore
  private firestore: Firestore = inject(Firestore);

  // Servicio para agregar un producto
  addProduct(product: Product) {
    const productRef = collection(this.firestore, 'products');
    return addDoc(productRef, product);
  }

  // Servicio para colsultar elm producto por el nombre
  getProduct(filter = '') {

    const productRef = collection(this.firestore, 'products');
    let q = query(productRef);
    if (filter) {
      q = query(productRef, where('name', '==', filter));
    }
    return collectionData(q) as unknown as Observable<Product[]>;
  }

  // Servicio para consultar el producto
  async updatePlayer(product: Product) {
    // Realizamos una consulta para obtener el id del producto ya creado
    const productRef = collection(this.firestore, 'products');
    let q = query(productRef, where('id', '==', product.id));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'products', document.id);
      await updateDoc(docRef, { ...product });
    });
  }

  async deleteProduct(id: string) {
    const productRef = collection(this.firestore, 'products');
    let q = query(productRef, where('id', '==', id));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'products', document.id);
      await deleteDoc(docRef);
    });

  }

}
