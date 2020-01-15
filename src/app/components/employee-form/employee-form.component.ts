import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Employee } from 'src/app/models/employee.model';
import { RolesService } from 'src/app/services/roles.service';
import { Subscription } from 'rxjs';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(
    private _rolesService: RolesService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public employee: Employee,
    public dialog: MatDialog) { }

    employeeForm: FormGroup;

    private rolesSub: Subscription;

    public roles: any;

    public title: string = "Rediger bruker";

    public isEditForm: boolean = true;

    ngOnInit(){
      this.rolesSub = this._rolesService.getRoles()
          .subscribe(result => {
            this.roles = result.filter(x => x !== 'Leder')
            if(!this.isEditForm)
              this.employeeForm.controls['role'].setValue(this.roles.find(x => 'Ansatt'), {onlySelf: true});
          });

      if(this.employee == null){
        this.isEditForm = false;
        this.title = 'Ny bruker',
        this.employee = new Employee();
      }

      this.initalizeForm();

    }

    initalizeForm(){
      this.employeeForm = this._formBuilder.group({
        userName: [{value: this.employee.userName, disabled: this.isEditForm},[
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100)
        ]],
        password: [{value: null, disabled: this.isEditForm},[
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100)
        ]],
        firstName: [this.employee.firstName, [
          Validators.required,
          Validators.maxLength(100)
        ]],
        lastName: [this.employee.lastName, [
          Validators.required,
          Validators.maxLength(100)
        ]],
        phoneNumber: [this.employee.phoneNumber, [
          Validators.minLength(4),
          Validators.maxLength(12)
        ]],
        role: [this.employee.role, [
          Validators.required
        ]]
      });
    }

    onSubmit(){
      const {value, valid} = this.employeeForm;
      if(valid){
          this.dialogRef.close(value);
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    changeRole(e){
      this.role.setValue(
        e.target.value,
        {onlySelf: true}
      );
    }

    deleteEmployee(){
      const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

        deleteDialogRef.afterClosed().subscribe(res => {
          if(res){
            this.dialogRef.close('deleted');
          }
      });
    }

    ngOnDestroy() {
      this.rolesSub.unsubscribe();
    }

    get userName(){
      return this.employeeForm.get('userName')
    }

    get password(){
      return this.employeeForm.get('password')
    }

    get firstName(){
      return this.employeeForm.get('firstName');
    }

    get lastName(){
      return this.employeeForm.get('lastName')
    }

    get phoneNumber(){
      return this.employeeForm.get('phoneNumber')
    }

    get role(){
      return this.employeeForm.get('role')
    }



}
