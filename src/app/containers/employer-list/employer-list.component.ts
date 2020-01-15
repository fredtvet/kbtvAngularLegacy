import { Component, OnInit } from '@angular/core';
import { Employer } from 'src/app/models/employer.model';
import { EmployersService } from 'src/app/services/employers.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployerFormComponent } from 'src/app/components/employer-form/employer-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css']
})
export class EmployerListComponent implements OnInit {

  constructor(
    private employersService: EmployersService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  public employers: Employer[];

  ngOnInit() {
    this.employersService.getEmployers().subscribe(response => {
      console.log(response);
      this.employers = response;
    })
  }

  openEditDialog(employer: Employer){
    const dialogRef = this.dialog.open(EmployerFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog',
      data: employer,
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data == 'deleted') this.deleteEmployer(employer.id);
      else if (data){
        data.id = employer.id;
        this.updateEmployer(data);
      }
    });
  }

  updateEmployer(employer: Employer){
    this.employersService.updateEmployer(employer)
    .subscribe(success => {
        this.employers = this.employers.map(e => {
          if(e.id == employer.id) return employer;
          else return e; });
          this.openSnackBar('Vellykket oppdatering!')
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  deleteEmployer(id: number){
    this.employersService.deleteEmployer(id);
    this.employers = this.employers.filter(x => x.id !== id);
    this.openSnackBar('Vellykket! Arbeidsgiver slettet.')
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(EmployerFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog'
    });

    dialogRef.afterClosed().subscribe(employer => {
      console.log('employee', employer);
      if(employer){
        this.createEmployer(employer);
      }
    });
  }

  createEmployer(employer: any){
    this.employersService.addEmployer(employer)
    .subscribe(
      id => {
        employer.id = id;
        this.employers.push(employer);
        this.openSnackBar('Vellykket! Ny arbeidsgiver registrert.')
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
