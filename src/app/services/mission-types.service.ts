import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { MissionType } from 'src/app/models/mission-type.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MissionTypesService {

  uri : String;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.uri = environment.apiUrl + '/MissionTypes'; }

  addMissionType(Name: string)
  {
    const obj = {
      Name
    };

    return this
            .http
            .post(`${this.uri}`, obj)
            .subscribe(res => console.log('Creation Complete'));
  }

  getMissionTypes() {
       return this
        .http
        .get<MissionType[]>(`${this.uri}`);
  }

  updateMissionType(Name: string, id)
  {
    const obj = {
      Name
    };

    return this
            .http
            .put(`${this.uri}/${id}`, obj)
            .subscribe(res => console.log('Creation Complete'));
  }

  deleteMissionType(id) {
    this
      .http
      .delete(`${this.uri}/${id}`)
      .subscribe(res => console.log('Delete Complete'));
  }
}
