import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MissionImage } from 'src/app/models/mission-image.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-image-viewer-dialog',
  animations: [
    trigger('showHide', [
      state('show', style({
        top:'0px'
      })),
      state('hide', style({
        top:'-56px'
      })),
      transition('show => hide', [
        animate('.1s ease-out')
      ]),
      transition('hide => show', [
        animate('.1s ease-in',)
      ]),
    ])
  ],
  templateUrl: './image-viewer-dialog.component.html',
  styleUrls: ['./image-viewer-dialog.component.css']
})
export class ImageViewerDialogComponent implements OnInit {

  toolbarHidden = false;

  constructor(
    public dialogRef: MatDialogRef<ImageViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MissionImage) {}

  ngOnInit() {

  }

  toggleToolBar(){
    this.toolbarHidden = !this.toolbarHidden;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
