import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee } from 'src/app/models/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {

  uri : String;

  constructor(private http: HttpClient) {this.uri = environment.apiUrl + '/Users'}

  addEmployee(employee: any)
  {
    return this
            .http
            .post(`${this.uri}`, employee);
  }

  getEmployees() {
       return this
        .http
        .get(`${this.uri}`);
  }

  getEmployee(username:string) {
    return this
     .http
     .get<Employee>(`${this.uri}/${username}`);
  }

  updateEmployee(employee: any)
  {
    return this
            .http
            .put(`${this.uri}/${employee.userName}`, employee);
  }

  deleteEmployee(userName: string) {
    this
      .http
      .delete(`${this.uri}/${userName}`)
      .subscribe(res => console.log('Delete Complete'));
  }

}
