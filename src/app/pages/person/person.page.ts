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
  date = '2023-04-20';
  name!: string;
  lastname!: string;
  phone!: string;

  constructor(private FirebaseService: FirebaseService) {}

  ngOnInit(): void {}

  addData() {
    this.FirebaseService.addData(
      this.path,
      this.name,
      this.lastname,
      this.date,
      this.phone
    );
  }
}
