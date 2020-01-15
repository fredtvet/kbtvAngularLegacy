import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees.service';
import { UserService } from 'src/app/services/user.service';
import { Employee } from 'src/app/models/employee.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private employeeService: EmployeesService,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ){ }

  public user: Employee;
  public status: string;

  ngOnInit() {
    this.userService.getCurrentUser()
    .subscribe(data => this.user = data.user);
  }

  updateProfile(updatedUser){
    updatedUser.userName = this.user.userName;

    this.userService.updateCurrentUser(updatedUser).subscribe(
      result =>{
        this.user = updatedUser;
        this.openSnackBar('Vellykket oppdatering!')
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  updatePassword(data: any){
    this.userService.changePassword(data.oldPassword, data.password).subscribe(
      result => this.openSnackBar('Passord oppdatert!'),
      error => this.openSnackBar(error)
    );
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'lukk', {
      duration: 3000,
      panelClass: 'toolbar_margin'
    });
  }

}
