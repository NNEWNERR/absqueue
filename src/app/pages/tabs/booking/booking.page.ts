import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class BookingPage implements OnInit {
  constructor() {}
  showSearchbar: boolean = false;
  ngOnInit() {}

  hospitalModel = [
    {
      title: 'โรงพยาบาลบ้านแพ้ว',
      room: 'ห้องเจาะเลือด OPD',
      onwork: 'วันทำการ: จ-ศ 8:00-12:00น',
      queue: 'จำนวนคิว: วันละ 70 คิว',
    },
    {
      title: 'โรงพยาบาลสมุทรสงคราม',
      room: 'ห้องเจาะเลือด DCK',
      onwork: 'วันทำการ: จ-ศ 8:00-12:00น',
      queue: 'จำนวนคิว: วันละ 50 คิว',
    },
    {
      title: 'โรงพยาบาลกรุงเทพ',
      room: 'ห้องเจาะเลือด SOS',
      onwork: 'วันทำการ: จ-ศ 8:00-12:00น',
      queue: 'จำนวนคิว: วันละ 65 คิว',
    },
    {
      title: 'โรงพยาบาลนนทบุรี',
      room: 'ห้องเจาะเลือด OPA',
      onwork: 'วันทำการ: จ-ศ 8:00-12:00น',
      queue: 'จำนวนคิว: วันละ 50 คิว',
    },
  ];
}
