import { Component, OnInit  } from '@angular/core';
import { MissionsService } from 'src/app/services/missions.service';
import { MissionList} from 'src/app/models/mission-list.model';
import { Subscription } from 'rxjs';
import { NgEventBus } from 'ng-event-bus';
import { MatDialog } from '@angular/material';
import { MissionFormComponent } from 'src/app/components/mission-form/mission-form.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})

export class MissionListComponent implements OnInit {

  private routeSub: Subscription;

  public missionList: MissionList = new MissionList();

  private searchString: string = "";

  constructor(private _missionsService: MissionsService, private _eventBus: NgEventBus, public dialog: MatDialog, private _router: Router) {}

  ngOnInit(){
    this.routeSub = this._missionsService.getMissionsPaginated().subscribe(
      result => this.missionList = result['result'],
      error => console.log(error),
      );

    this._eventBus.on('searched').subscribe(searchInput => this.searchMissionList(searchInput));
  }

  searchMissionList(searchString){
    this.searchString = searchString;
    this._missionsService.getMissionsPaginated(this.missionList.paginationInfo.actualPage, this.searchString)
      .subscribe(result => this.missionList = result['result']);
  }

  changePage(pageId){
    this._missionsService.getMissionsPaginated(pageId, this.searchString)
    .subscribe(result => this.missionList = result['result']);
  }

  createMission(){
    const dialogRef = this.dialog.open(MissionFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog'
    });

    dialogRef.afterClosed().subscribe(mission => {
      console.log(mission);
      if(mission){
        this._missionsService.addMission(mission)
        .subscribe(id => this._router.navigate(['oppdrag', id, 'detaljer']));
      }
    });

  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
