import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MissionNote } from 'src/app/models/mission-note.model';

@Component({
  selector: 'app-mission-note-form',
  templateUrl: './mission-note-form.component.html',
  styleUrls: ['./mission-note-form.component.css']
})

export class MissionNoteFormComponent {

  noteForm: FormGroup;

  public note: MissionNote = new MissionNote();

  public missionId: number;

  public headerTitle: string = "Rediger notat";

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MissionNoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)  { }

  ngOnInit(){
    if(this.data.note){ //Note passed in
      this.headerTitle = 'Nytt notat';
      this.note = this.data.note;
    }
    this.missionId = this.data.missionId; //Check for undefined
    this.initalizeForm();
  }

  initalizeForm(){
    this.noteForm = this._formBuilder.group({
      id: +this.note.id,
      title: [this.note.title, [
        Validators.maxLength(40)
      ]],
      content: [this.note.content, [
        Validators.required,
        Validators.maxLength(400)
      ]],
      pinned: this.note.pinned,
      missionId: +this.missionId
    });
  }

  onSubmit(){
    const {value, valid} = this.noteForm;
    if(valid){
        this.dialogRef.close(value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  get title(){
    return this.noteForm.get('title')
  }

  get content(){
    return this.noteForm.get('content');
  }

  get pinned(){
    return this.noteForm.get('pinned')
  }



}
