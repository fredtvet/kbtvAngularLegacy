import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionNotesService } from 'src/app/services/mission-notes.service';
import { Subscription } from 'rxjs';
import { MissionNote } from 'src/app/models/mission-note.model';
import { MissionNoteFormComponent } from 'src/app/components/mission-note-form/mission-note-form.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-mission-note-details',
  templateUrl: './mission-note-details.component.html',
  styleUrls: ['./mission-note-details.component.css']
})
export class MissionNoteDetailsComponent implements OnInit {

  public note: MissionNote;

  private routeSub: Subscription;

  public missionId: number;
  public noteId: number;

  constructor(
    private _notesService: MissionNotesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      this.missionId = params['missionId'];
      this.noteId = params['id']
    });

    this._notesService.getNote(this.missionId, this.noteId).subscribe(result => {
      this.note = result;
      console.log(this.note);
    },
      error => console.log("Error: ", error)
    );

  }

  deleteMissionNote(){
    this._notesService.deleteNote(this.missionId, this.noteId);
    this.onBack()
  }

  editMissionNote(){
    console.log(this.note);
    this._notesService.getNote(this.missionId, this.noteId)
      .subscribe(res => this.openEditDialog({ missionId: this.missionId, note: res }));
  }

  openEditDialog(data: any){
    const dialogRef = this.dialog.open(MissionNoteFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog',
      data: data,
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if(res){
        this._notesService.updateNote(this.missionId, res)
        .subscribe(success => console.log(success));
        this.note = res;
      }
    });
  }

  onBack(){
    this.router.navigate(['/oppdrag', this.missionId, 'detaljer'])
  }

}
