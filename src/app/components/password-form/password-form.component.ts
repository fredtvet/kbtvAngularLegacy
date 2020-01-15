import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder) { }

    @Output() passwordUpdated = new EventEmitter();

    passwordForm: FormGroup;

    public message: string;

    ngOnInit(){
      this.initalizeForm();
    }

    initalizeForm(){
      this.passwordForm = this._formBuilder.group({
        oldPassword: ['', [Validators.required, Validators.minLength(7)]],
        password: ['', [Validators.required, Validators.minLength(7)]],
        confirmPassword: ['', Validators.required]
      });
    }

    onSubmit(){

      const {value, valid} = this.passwordForm;
      console.log(value);
      if(valid && this.password.value == this.confirmPassword.value)
      {
        this.message = "";
        this.passwordUpdated.emit(value);
      }
      else if (this.password.value !== this.confirmPassword.value)
        this.message = "Passordene er ikke like";
      else
        this.message = "";


    }

    ngOnDestroy() {

    }

    get oldPassword(){
      return this.passwordForm.get('oldPassword')
    }

    get password(){
      return this.passwordForm.get('password')
    }

    get confirmPassword(){
      return this.passwordForm.get('confirmPassword');
    }

}
