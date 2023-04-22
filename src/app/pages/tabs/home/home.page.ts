import { FirebaseService } from 'src/app/service/firebase.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { db } from 'src/app/service/firebase-config';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  providers: [FirebaseService],
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class HomePage implements OnInit {
  constructor(private firebaseService: FirebaseService) {}
  documents: any[] = [];

  async ngOnInit() {
    this.documents = await this.firebaseService.getDocuments('person');
    console.log(this.documents);
    this.firebaseService.subscribeToChanges('person');
  }

  handleDelete(id: string) {
    this.firebaseService.deleteData(id);
  }
}
