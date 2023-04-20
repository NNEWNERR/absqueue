import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-silde',
  templateUrl: './silde.page.html',
  styleUrls: ['./silde.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SildePage implements OnInit {
  showSkip = true;

  constructor(public router: Router) {}

  ngOnInit() {}

  startApp() {
    this.router.navigateByUrl('/sidemenu', { replaceUrl: true });
  }
}
