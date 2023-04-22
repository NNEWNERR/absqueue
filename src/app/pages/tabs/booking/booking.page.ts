import { PostgresService } from './../../../service/postgres.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
})
export class BookingPage implements OnInit {
  constructor(
    private http: HttpClient,
    private postgresService: PostgresService,
    private loadingController: LoadingController
  ) {}
  showSearchbar: boolean = false;
  hospital: any[] = [];

  ngOnInit() {
    this.getRefresh();
    // subscribe to the hospitalAdded$ observable of the DataService to refresh data when a hospital is added
    this.postgresService.hospitalAdded$.subscribe(() => {
      this.getData();
    });
    console.log('booking page');
  }

  getData() {
    this.http
      .get<any[]>('http://localhost:3000/api/hospital')
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      )
      .subscribe((data) => {
        this.hospital = data;
        console.log(this.hospital);
      });
  }

  async getRefresh() {
    const loading = await this.loadingController.create({
      message: 'กำลังดำเนินการ..',
      spinner: 'circles',
    });
    await loading.present();
    this.postgresService.getData().subscribe((data) => {
      this.hospital = data;
      console.log(this.hospital);
    });
    loading.dismiss();
  }

  handlerDelete(id: number) {
    this.postgresService.deleteHospital(id).then(() => {
      this.getRefresh();
    });
  }
}
