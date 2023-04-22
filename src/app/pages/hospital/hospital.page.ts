import { PostgresService } from './../../service/postgres.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { BookingPage } from '../tabs/booking/booking.page';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.page.html',
  styleUrls: ['./hospital.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class HospitalPage implements OnInit {
  constructor(
    private postgresService: PostgresService,
    private loadingController: LoadingController
  ) {}
  name!: string;
  room!: string;
  onwork!: string;
  queue!: string;

  ngOnInit() {}

  async get() {
    this.postgresService.hospitalAdded();
  }

  async handleAddHospital() {
    const loading = await this.loadingController.create({
      message: 'กำลังดำเนินการ..',
      spinner: 'circles',
    });
    await loading.present();
    this.postgresService.addHospital(
      this.name,
      this.room,
      this.onwork,
      this.queue
    ); // call the hospitalAdded() method of the DataService to notify other components that a hospital was added
    this.postgresService.hospitalAdded();
    this.name = '';
    this.room = '';
    this.onwork = '';
    this.queue = '';
    loading.dismiss();
  }
}
