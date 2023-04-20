import { AppComponent } from './../../../app.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class SettingsPage implements OnInit {
  constructor() {}
  darkMode = false;
  ngOnInit() {}

  settingpage = [
    {
      title: 'ตั้งค่าการใช้งาน',
      url: '/tabs/home',
    },
    {
      title: 'เงื่อนไขการให้บริการ',
      url: '/tabs/booking',
    },
    {
      title: 'นโยบายความเป็นส่วนตัว',
      url: '/tabs/scan',
    },
    {
      title: 'เกี่ยวกับ',
      url: '/tabs/setting',
    },
    {
      title: 'แจ้งปัญหาการใช้งาน',
      url: '/tabs/setting',
    },
  ];
}
