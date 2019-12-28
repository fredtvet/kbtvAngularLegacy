import { Component, OnInit, Inject } from '@angular/core';
import { MissionTypesService } from 'src/app/services/mission-types.service';
import { EmployersService } from 'src/app/services/employers.service';
import { MissionType } from 'src/app/models/mission-type.interface';
import { Employer } from 'src/app/models/employer.model';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { Mission } from 'src/app/models/mission.model';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css']
})

export class MissionFormComponent implements OnInit {

  missionForm: FormGroup;

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }

  public isStreetAddress = false;

  public title: string = "Rediger oppdrag";

  private typeSub: Subscription;

  private employerSub: Subscription;

  public missionTypes: MissionType[];

  public employers: Employer[];

  constructor(
    private _missionTypesService: MissionTypesService,
    private _employersService: EmployersService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MissionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public mission: Mission)  { }

  ngOnInit(){
    this.typeSub = this._missionTypesService.getMissionTypes().subscribe(result => this.missionTypes = result);
    this.employerSub = this._employersService.getEmployers().subscribe(result => this.employers = result);
    console.log(this.mission);
    if(this.mission == null){
      this.title = 'Nytt oppdrag',
      this.mission = new Mission();
    }

    this.initalizeForm();
  }

  initalizeForm(){
    this.missionForm = this._formBuilder.group({
      id: this.mission.id,
      address: [this.mission.address, [
        Validators.required,
        Validators.maxLength(100)
      ]],
      phoneNumber: [this.mission.phoneNumber, [
        Validators.minLength(4),
        Validators.maxLength(12)
      ]],
      description: [this.mission.description, [
        Validators.maxLength(400)
      ]],
      employerId: [this.mission.employerId],
      missionTypeId: [this.mission.missionTypeId]
    });
  }

  onSubmit(){
    const {value, valid} = this.missionForm;
    if(valid){
        this.dialogRef.close(value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleAddressChange(googleAddress){
    this.missionForm.controls['address']
      .setValue(googleAddress.formatted_address);
  }

  changeType(e){
    this.missionTypeId.setValue(
      e.target.value,
      {onlySelf: true}
    );
  }

  changeEmployer(e){
    this.employerId.setValue(
      e.target.value,
      {onlySelf: true}
    );
  }

  ngOnDestroy() {
    this.typeSub.unsubscribe();
    this.employerSub.unsubscribe();
  }

  get address(){
    return this.missionForm.get('address')
  }

  get phoneNumber(){
    return this.missionForm.get('phoneNumber');
  }

  get description(){
    return this.missionForm.get('description')
  }

  get employerId(){
    return this.missionForm.get('employerId')
  }

  get missionTypeId(){
    return this.missionForm.get('missionTypeId')
  }

}
