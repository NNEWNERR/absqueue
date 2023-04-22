import { LoadingController } from '@ionic/angular';
import { hospital } from './../model/hospital.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Hospital } from 'postgres-sql/dist/hospital/entities/hospital.entity';

@Injectable({
  providedIn: 'root',
})
export class PostgresService {
  constructor(
    private http: HttpClient,
    private loadingController: LoadingController
  ) {}
  hospital: any[] = [];

  async addHospital(name: string, room: string, onwork: string, queue: string) {
    try {
      const hospital: hospital = {
        name: name,
        room: room,
        onwork: onwork,
        queue: queue,
      };
      this.http
        .post('http://localhost:3000/api/hospital', hospital)
        .subscribe(() => {
          // call the getData() method again to refresh the list
          this.getData().subscribe((data) => {
            this.hospital = data;
            console.log(this.hospital);
          });
        });
    } catch (error) {}
  }

  async deleteHospital(id: number) {
    try {
      this.http
        .delete(`http://localhost:3000/api/hospital/${id}`)
        .subscribe(() => {});
    } catch (error) {
      console.error(error);
    }
  }

  updateHospital() {}

  getData(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>('http://localhost:3000/api/hospital').pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  private hospitalAddedSubject = new Subject<void>();

  hospitalAdded$ = this.hospitalAddedSubject.asObservable();

  hospitalAdded() {
    this.hospitalAddedSubject.next();
  }
}
