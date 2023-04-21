import { FirebaseService } from 'src/app/service/firebase.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'src/app/service/firebase-config';
import { person } from 'src/app/model/person.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class EditPage implements OnInit {
  path = 'person';
  date = '2023-04-20';
  name!: string;
  lastname!: string;
  phone!: string;
  docId: string;
  documents: any[] = [];

  _name: string = '';
  _lastname: string = '';
  _phone: string = '';
  _date: string = '';
  _id: string = '';

  constructor(
    private route: ActivatedRoute,
    private FirebaseService: FirebaseService
  ) {
    this.docId = '';
  }

  ngOnInit() {
    this.getDocuments();
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.docId = id;
      this._id = id;
    }
    const docRef = doc(db, this.path, this.docId);
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        const data = doc.data();
        this._name = data['name'];
        this._lastname = data['lastname'];
        this._date = data['brithday'];
        this._phone = data['phone'];
      } else {
        console.log('No such document!');
      }
    });
  }

  async getDocuments() {
    const querySnapshot = await getDocs(collection(db, 'person'));
    this.documents = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  }

  async updatedate(id: string) {
    try {
      const docRef = doc(db, 'person', id);
      await updateDoc(docRef, {
        name: this.name,
        lastname: this.lastname,
        brithday: this.date,
        phone: this.phone,
      });
      this.FirebaseService.presentToast(
        'middle',
        `Document with ID ${docRef.id} has been updated.`
      );
    } catch (error) {
      console.error();
      this.FirebaseService.presentToast(
        'middle',
        'Error updating document: ' + error
      );
    }
  }
}
