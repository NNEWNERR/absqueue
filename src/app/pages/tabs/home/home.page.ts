import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {
  constructor(private firestore: AngularFirestore) {}
  person: any[] = [];
  ngOnInit(): void {
    this.firestore
      .collection('person')
      .valueChanges()
      .subscribe((item) => {
        this.person = item;
      });
  }
}
