import { FirebaseService } from 'src/app/service/firebase.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

interface User {
  name: string;
  last: string;
}

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
    private firebaseService: FirebaseService
  ) {
    this.docId = '';
  }

  ngOnInit() {
    this.firebaseService.getDocuments('person');
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

  handleUpdate(id: string) {
    this.firebaseService.updateData(
      id,
      this.name,
      this.lastname,
      this.date,
      this.phone
    );
  }
}
