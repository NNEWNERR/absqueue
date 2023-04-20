import { Injectable } from '@angular/core';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

export interface person {
  id?: string;
  name: string;
  lastname: string;
  brithday: any;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  // Get a Firestore instance
  firestore = getFirestore();

  // Create a new document in a collection
  async createDocument(
    _path: string,
    _name: string,
    _lastname: string,
    _brithday: any,
    _phone: string
  ) {
    try {
      const person: person = {
        name: _name,
        lastname: _lastname,
        brithday: _brithday,
        phone: _phone,
      };
      const docRef = await addDoc(collection(this.firestore, _path), person);
      alert('Document written with ID: ' + docRef.id);
    } catch (e) {
      alert('Error adding document: ' + e);
    }
  }
}
