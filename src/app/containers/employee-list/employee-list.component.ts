import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from 'src/app/components/employee-form/employee-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(
    private employeesService: EmployeesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  public employees: Employee[];

  ngOnInit() {
    this.employeesService.getEmployees().subscribe(response => {
      this.employees = response['result'];
    })
  }

  openEditDialog(employee: Employee){
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog',
      data: employee,
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data == 'deleted') this.deleteEmployee(employee.userName);
      else if (data){
        data.userName = employee.userName;
        this.updateEmployee(data);
      }
    });
  }

  updateEmployee(employee: Employee){
    this.employeesService.updateEmployee(employee)
    .subscribe(
      success => {
        this.employees = this.employees.map(e => {
                  if(e.userName == employee.userName) return employee;
                  else return e; })
        this.openSnackBar('Vellykket oppdatering!')
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  deleteEmployee(username: string){
    this.employeesService.deleteEmployee(username);
    this.employees = this.employees.filter(x => x.userName !== username);
    this.openSnackBar('Vellykket! Bruker slettet.')
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(EmployeeFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog'
    });

    dialogRef.afterClosed().subscribe(employee => {
      console.log('employee', employee);
      if(employee){
        this.createEmployee(employee);
      }
    });
  }

  createEmployee(employee: any){
    this.employeesService.addEmployee(employee)
    .subscribe(
      success => {
        this.employees.push(employee);
        this.openSnackBar('Vellykket! Ny bruker registrert.')
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'lukk', {
      duration: 3000,
      panelClass: 'toolbar_margin'
    });
  }

}
