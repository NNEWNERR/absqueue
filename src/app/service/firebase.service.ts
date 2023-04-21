import { Injectable } from '@angular/core';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { person } from '../model/person.model';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private toastController: ToastController) {}

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

      this.presentToast('middle', 'Document written with ID: ' + docRef.id);
    } catch (e) {
      this.presentToast('middle', 'Error adding document: ' + e);
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    await toast.present();
  }
}
