import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionsService } from 'src/app/services/missions.service';
import { MissionDetails } from 'src/app/models/mission-details.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MissionImagesService } from 'src/app/services/mission-images.service';
import { ConfirmDeleteDialogComponent } from 'src/app/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { MissionFormComponent } from 'src/app/components/mission-form/mission-form.component';
import { MissionNoteFormComponent } from 'src/app/components/mission-note-form/mission-note-form.component';
import { MissionNotesService } from 'src/app/services/mission-notes.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})

export class MissionDetailsComponent {

  filesToUpload: FileList;

  unloadedThumbnails: any[] = [];
  reloadThumbnailsState: boolean = false;
  reloadInterval: any;

  public mission: MissionDetails;

  private routeSub: Subscription;
  private missionSub: Subscription;

  public missionId: number;

  constructor(
    private _missionsService: MissionsService,
    private _imagesService: MissionImagesService,
    private _missionNotesService: MissionNotesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {}

  ngOnInit(){

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      this.missionId = params['id']
    });

    this.missionSub = this._missionsService.getMissionDetails(this.missionId).subscribe(
      result => this.mission = result,
      error => console.log("Error: ", error),
      () =>  this.mission.address = this.mission.address.replace(", Norge","").replace(/,/g, ";")
    );
  }


  uploadFiles(files: FileList){
    this.filesToUpload = files;
    this._imagesService.uploadImages(this.missionId, files).subscribe(
      result => this.mission.missionImages = this.mission.missionImages.concat(result),
      error => this.openSnackBar('Mislykket! Noe gikk feil.'),
      () => this.openSnackBar(`Vellykket! ${files.length} bilde(r) lastet opp.`)
      );
  }

  deleteMission(){
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    deleteDialogRef.afterClosed().subscribe(res => {
      if(res){
        this._missionsService.deleteMission(this.missionId);
        this.onBack();
        this.openSnackBar('Vellykket! Oppdrag slettet.')
      }
    });
  }

  editMission(){
    this._missionsService.getMission(this.missionId)
      .subscribe(res => this.openEditDialog(res));
  }

  openEditDialog(data: any){
    const dialogRef = this.dialog.open(MissionFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog',
      data: data,
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this._missionsService.updateMission(res)
        .subscribe(
          success => {
              this.mission.address = res.address.replace(", Norge","").replace(/,/g, ";");
              this.mission.phoneNumber = res.phoneNumber;
              this.mission.description = res.description;
              this.openSnackBar('Vellykket oppdatering!');
          },
          error => this.openSnackBar('Mislykket! Noe gikk feil.')
      )}});
  }

  createMissionNote(){
    const dialogRef = this.dialog.open(MissionNoteFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog',
      data: { missionId: this.missionId }
    });

    dialogRef.afterClosed().subscribe(note => {
      console.log(note);
      if(note){
        this._missionNotesService.addNote(this.missionId, note)
        .subscribe(id => this.router.navigate(['oppdrag', this.missionId, 'notater', id]));
      }
    });

  }

  deleteImage(id){
    this._imagesService.deleteImage(this.missionId, id).subscribe(res => console.log(res));
    this.mission.missionImages = this.mission.missionImages.filter(val => val.id != id);
    this.openSnackBar('Vellykket! Bilde slettet');
  }

  pinnedNotes(pinned: boolean){
    return this.mission.missionNotes.filter(x => x.pinned == pinned);
  }

  onBack(){
    this.router.navigate(['/oppdrag'])
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.missionSub.unsubscribe();
  }

  trackByFn(index:number, missionImage:any): number {
    return missionImage.id;
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'lukk', {
      duration: 3000,
      panelClass: 'toolbar_margin'
    });
  }

}
