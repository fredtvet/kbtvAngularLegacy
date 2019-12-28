import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { MissionImage } from '../models/mission-image.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MissionImagesService {

  uri : String;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { this.uri = environment.apiUrl  + '/missions'; }

  uploadImages(missionId, files: FileList)
  {
    const formData: FormData = new FormData();
    for(let i = 0; i < files.length; i++){
        formData.append('file', files[i], files[i].name)
    }

    console.log(formData);

    return this.http
            .post<any>(`${this.uri}/${missionId}/MissionImages`, formData)
  }

  deleteImage(missionId, id) {
    return this.http
            .delete<boolean>(`${this.uri}/${missionId}/MissionImages/${id}`)
  }
}
