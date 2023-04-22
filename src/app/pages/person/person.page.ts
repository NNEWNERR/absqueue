import { FirebaseService } from 'src/app/service/firebase.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class PersonPage implements OnInit {
  path = 'person';
  name: string = '';
  lastname: string = '';
  birthday = '2023-04-20';
  phone: string = '';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {}

  async addData() {
    // call the FirebaseService function to create the document
    await this.firebaseService.createUser(
      'person',
      this.name,
      this.lastname,
      this.birthday,
      this.phone
    );
    this.name = '';
    this.lastname = '';
    this.birthday = '';
    this.phone = '';
  }
}
