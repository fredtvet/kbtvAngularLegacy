import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject } from '@angular/core';
import { MissionNote } from '../models/mission-note.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MissionNotesService {

  uri : String;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.uri = environment.apiUrl + '/missions'; }

  addNote(missionId, note: any)
  {
    console.log(note);
    return this.http
            .post<number>(`${this.uri}/${missionId}/MissionNotes`, note, {headers: { 'Content-Type': 'application/json'}});

  }

  getNote(missionId, id) {
    return this
            .http
            .get<MissionNote>(`${this.uri}/${missionId}/MissionNotes/${id}`);
  }

  updateNote(missionId, note: any)
  {
    return this
            .http
            .put<boolean>(`${this.uri}/${missionId}/MissionNotes/${note.id}`, note, {headers: { 'Content-Type': 'application/json'}});
  }

  deleteNote(missionId, id) {
    this
      .http
      .delete(`${this.uri}/${missionId}/MissionNotes/${id}`)
      .subscribe(res => console.log('Delete Complete'));
  }
}
