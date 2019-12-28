import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule,Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MissionFormComponent } from './components/mission-form/mission-form.component';

import { LayoutModule } from '@angular/cdk/layout';

import { ReactiveFormsModule } from '@angular/forms';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { AngularMaterialModule } from './angular-material.module';

import { NgEventBus } from 'ng-event-bus';

import { MissionListComponent } from './containers/mission-list/mission-list.component';
import { MissionDetailsComponent } from './containers/mission-details/mission-details.component';
import { MissionsService } from 'src/app/services/missions.service';
import { MissionTypesService } from 'src/app/services/mission-types.service';
import { EmployersService } from 'src/app/services/employers.service';
import { MissionImagesService } from 'src/app/services/mission-images.service';

import { MainNavComponent } from './layout/main-nav/main-nav.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavListItemComponent } from './components/nav-list-item/nav-list-item.component';
import { BottomNavComponent } from './layout/bottom-nav/bottom-nav.component';
import { NestedNavComponent } from './layout/nested-nav/nested-nav.component';
import { MissionNoteDetailsComponent } from './containers/mission-note-details/mission-note-details.component';
import { MissionNoteFormComponent } from './components/mission-note-form/mission-note-form.component';
import { ThumbnailPipe } from './pipes/thumbnail.pipe';
import { ImageViewerDialogComponent } from './components/image-viewer-dialog/image-viewer-dialog.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { ImageListComponent }  from './components/image-list/image-list.component';

import { ImageRowPipe } from './pipes/image-row.pipe';




const routes: Routes = [
{
  path: '',
  component: MainNavComponent,
  pathMatch: 'full',
  children:[
    {
      path: '',
      component: MissionListComponent,
      outlet: 'mainNavContent'
    },
    {
      path: '',
      component: BottomNavComponent,
      outlet: 'mainNavBotNav'
    },
    {
      path: '',
      component: SearchBarComponent,
      outlet: 'mainNavSearchBar'
    }
  ]
},
{
  path: 'oppdrag',
  component: MainNavComponent,
  pathMatch: 'full',
  children:[
    {
      path: '',
      component: MissionListComponent,
      outlet: 'mainNavContent'
    },
    {
      path: '',
      component: BottomNavComponent,
      outlet: 'mainNavBotNav'
    },
    {
      path: '',
      component: SearchBarComponent,
      outlet: 'mainNavSearchBar'
    },
  ]
},
{
  path: 'oppdrag/ny',
  component: MissionFormComponent,
  pathMatch: 'full',
},
{
  path: 'oppdrag/:id/rediger',
  component: MissionFormComponent,
  pathMatch: 'full',
},
{
  path: 'oppdrag/:id/detaljer',
  component: MissionDetailsComponent,
  pathMatch: 'full',
},
{
  path: 'oppdrag/:missionId/notater/ny',
  component: MissionNoteFormComponent,
  pathMatch: 'full',
},
{
  path: 'oppdrag/:missionId/notater/:id',
  component: MissionNoteDetailsComponent,
  pathMatch: 'full',
},
{
  path: 'oppdrag/:missionId/notater/:id/rediger',
  component: MissionNoteFormComponent,
  pathMatch: 'full',
},
]


@NgModule({
  declarations: [
    AppComponent,
    MissionListComponent,
    MainNavComponent,
    MissionDetailsComponent,
    MissionFormComponent,
    PaginationComponent,
    SearchBarComponent,
    NavListItemComponent,
    BottomNavComponent,
    NestedNavComponent,
    MissionNoteDetailsComponent,
    MissionNoteFormComponent,
    ThumbnailPipe,
    ImageRowPipe,
    ImageViewerDialogComponent,
    ConfirmDeleteDialogComponent,
    ImageListComponent
  ],
  entryComponents: [ ImageViewerDialogComponent, ConfirmDeleteDialogComponent, MissionFormComponent, MissionNoteFormComponent ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    LayoutModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    GooglePlaceModule
  ],
  providers: [
    MissionsService,
    MissionTypesService,
    EmployersService,
    MissionImagesService,
    NgEventBus
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
