import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Employer } from 'src/app/models/employer.model';
import { Subscription } from 'rxjs';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html',
  styleUrls: ['./employer-form.component.css']
})
export class EmployerFormComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmployerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public employer: Employer,
    public dialog: MatDialog) { }

    googleOptions = {
      types: ['geocode'],
      componentRestrictions: { country: "no" }
    }

    public isStreetAddress = false;

    employerForm: FormGroup;

    public title: string = "Rediger arbeidsgiver";

    public isEditForm: boolean = true;

    ngOnInit(){
      if(this.employer == null){
        this.isEditForm = false;
        this.title = 'Ny arbeidsgiver',
        this.employer = new Employer();
      }

      this.initalizeForm();

    }

    initalizeForm(){
      this.employerForm = this._formBuilder.group({
        name: [this.employer.name, [
          Validators.required,
          Validators.maxLength(200)
        ]],
        phoneNumber: [this.employer.phoneNumber, [
          Validators.minLength(4),
          Validators.maxLength(12)
        ]],
        address: [this.employer.address, [
          Validators.maxLength(100)
        ]]
      });
    }

    onSubmit(){
      const {value, valid} = this.employerForm;
      if(valid){
          this.dialogRef.close(value);
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    deleteEmployer(){
      const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

        deleteDialogRef.afterClosed().subscribe(res => {
          if(res){
            this.dialogRef.close('deleted');
          }
      });
    }

    handleAddressChange(googleAddress){
      this.employerForm.controls['address']
        .setValue(googleAddress.formatted_address);
    }

    ngOnDestroy() {

    }

    get name(){
      return this.employerForm.get('name')
    }

    get phoneNumber(){
      return this.employerForm.get('phoneNumber')
    }

    get address(){
      return this.employerForm.get('address')
    }



}
