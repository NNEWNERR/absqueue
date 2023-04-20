import { ChangeDetectorRef, Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';
import { firestoreRef } from './firebase-config';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  documents: any[] = [];
  unsubscribe: any;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.unsubscribe();
  }

  async getDocuments(collectionName: string): Promise<any[]> {
    const querySnapshot = await getDocs(collection(firestoreRef, collectionName));
    const documents = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return documents;
  }

  async handleDelete(collectionName: string, id: string): Promise<void> {
    const docRef = doc(firestoreRef, collectionName, id);
    try {
      await deleteDoc(docRef);
      console.log(`Document with ID ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }
}
