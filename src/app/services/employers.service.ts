import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employer } from 'src/app/models/employer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EmployersService {

  uri : String;

  constructor(private http: HttpClient) {this.uri = environment.apiUrl + '/Employers'}

  addEmployer(Name: string, PhoneNumber: string, Address: string)
  {
    const obj = {
      Name,
      PhoneNumber,
      Address
    };

    return this
            .http
            .post(`${this.uri}`, obj)
            .subscribe(res => console.log('Creation Complete'));
  }

  getEmployers() {
       return this
        .http
        .get<Employer[]>(`${this.uri}`);
  }

  updateEmployer(Name: string, PhoneNumber: string, Address: string, id)
  {
    const obj = {
      Name,
      PhoneNumber,
      Address
    };

    return this
            .http
            .put(`${this.uri}/${id}`, obj)
            .subscribe(res => console.log('Creation Complete'));
  }

  deleteEmployer(id) {
    this
      .http
      .delete(`${this.uri}/${id}`)
      .subscribe(res => console.log('Delete Complete'));
  }
}
