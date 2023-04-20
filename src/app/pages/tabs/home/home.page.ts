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
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class HomePage implements OnInit {
  documents: any[] = [];
  unsubscribe: any;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.getDocuments();
    this.subscribeToChanges();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  async getDocuments() {
    const querySnapshot = await getDocs(collection(db, 'person'));
    this.documents = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    this.cdRef.detectChanges(); // Manually trigger change detection
  }

  subscribeToChanges() {
    const docRef = collection(db, 'person');
    this.unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const newDoc = { id: change.doc.id, ...change.doc.data() };
          const exists = this.documents.some((doc) => doc.id === newDoc.id);
          if (!exists) {
            this.documents.push(newDoc);
          }
        }
        if (change.type === 'modified') {
          const index = this.documents.findIndex(
            (doc) => doc.id === change.doc.id
          );
          this.documents[index] = { id: change.doc.id, ...change.doc.data() };
        }
        if (change.type === 'removed') {
          const index = this.documents.findIndex(
            (doc) => doc.id === change.doc.id
          );
          this.documents.splice(index, 1);
        }
      });
      this.cdRef.detectChanges(); // Manually trigger change detection
    });
  }

  async deleteData(id: string) {
    const docRef = doc(db, 'person', id);
    try {
      await deleteDoc(docRef);
      this.cdRef.detectChanges(); // Manually trigger change detection
      console.log(`Document with ID ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }
}
