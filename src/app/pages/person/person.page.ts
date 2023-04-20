import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class PersonPage implements OnInit {
  path = 'person';
  date = '2047-05-17';
  name!: string;
  lastname!: string;
  phone!: string;
  constructor(private dataservice: DataService) {}

  ngOnInit() {}

  addData() {
    this.dataservice.createDocument(
      this.path,
      this.name,
      this.lastname,
      this.date,
      this.phone
    );
  }
}
