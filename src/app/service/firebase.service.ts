import {
  getFirestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { person } from '../model/person.model';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { db } from './firebase-config';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  documents: any[] = [];
  unsubscribe: any;

  // Get a Firestore instance
  firestore = getFirestore();

  // Create a new document in a collection
  async createUser(
    _path: string,
    _name: string,
    _lastname: string,
    _brithday: any,
    _phone: string
  ) {
    const loading = await this.loadingController.create({
      message: 'กำลังดำเนินการ..',
      spinner: 'circles',
    });
    await loading.present();
    try {
      const person: person = {
        name: _name,
        lastname: _lastname,
        brithday: _brithday,
        phone: _phone,
      };

      const docRef = await addDoc(collection(this.firestore, _path), person);
      this.presentToast('middle', 'เพิ่มผู้ใช้งานแล้ว : ' + docRef.id);
    } catch (e) {
      this.presentToast('middle', 'เกิดข้อผิดพลาด : ' + e);
    }
    loading.dismiss();
  }
  async updateData(
    id: string,
    name: string,
    lastname: string,
    brithday: string,
    phone: string
  ) {
    const loading = await this.loadingController.create({
      message: 'กำลังดำเนินการ..',
      spinner: 'circles',
    });
    await loading.present();
    try {
      const docRef = doc(db, 'person', id);
      await updateDoc(docRef, {
        name: name,
        lastname: lastname,
        brithday: brithday,
        phone: phone,
      });
      this.presentToast(
        'middle',
        `ข้อมูลของ ${docRef.id} ได้รับการอัพเดตแล้ว.`
      );
    } catch (error) {
      this.presentToast('middle', 'เกิดข้อผิดพลาด : ' + error);
    }
    loading.dismiss();
  }

  async deleteData(id: string) {
    const loading = await this.loadingController.create({
      message: 'กำลังดำเนินการ..',
      spinner: 'circles',
    });
    await loading.present();

    const docRef = doc(db, 'person', id);
    try {
      await deleteDoc(docRef);
      const index = this.documents.findIndex((doc) => doc.id === id);
      if (index > -1) {
        this.documents.splice(index, 1);
      }
      this.presentToast('middle', `ข้อมูลของ ${id} ลบสำเร็จแล้ว`);
    } catch (error) {
      this.presentToast('middle', 'เกิดข้อผิดพลาด : ' + error);
    }
    loading.dismiss();
  }

  async getDocuments(collectionName: string): Promise<person[]> {
    const querySnapshot = await getDocs(collection(db, collectionName));
    this.documents = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as person;
    });
    return this.documents;
  }

  subscribeToChanges(collectionName: string) {
    const docRef = collection(db, collectionName);
    this.unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        //ถ้ามีการเพิ่ม
        if (change.type === 'added') {
          const newDoc = { id: change.doc.id, ...change.doc.data() };
          const exists = this.documents.some((doc) => doc.id === newDoc.id);
          if (!exists) {
            this.documents.push(newDoc);
          }
        }
        //ถ้ามีการอัพเดต
        if (change.type === 'modified') {
          const index = this.documents.findIndex(
            (doc) => doc.id === change.doc.id
          );
          this.documents[index] = { id: change.doc.id, ...change.doc.data() };
        }
        //ถ้ามีการลบ
        if (change.type === 'removed') {
          const index = this.documents.findIndex(
            (doc) => doc.id === change.doc.id
          );
          this.documents.splice(index, 1);
        }
      });
      this.changeDetectorRef.detectChanges(); // Manually trigger change detection
    });
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
