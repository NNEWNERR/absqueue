import { Injectable } from '@angular/core';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { person } from '../model/person.model';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {}

  // Get a Firestore instance
  firestore = getFirestore();

  // Create a new document in a collection
  async addData(
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
