import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule,Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MissionFormComponent } from './components/mission-form/mission-form.component';

import { LayoutModule } from '@angular/cdk/layout';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { AngularMaterialModule } from './angular-material.module';

import { NgEventBus } from 'ng-event-bus';

import { MissionListComponent } from './containers/mission-list/mission-list.component';
import { MissionDetailsComponent } from './containers/mission-details/mission-details.component';
import { MissionsService } from 'src/app/services/missions.service';
import { MissionTypesService } from 'src/app/services/mission-types.service';
import { EmployersService } from 'src/app/services/employers.service';
import { EmployeesService } from 'src/app/services/employees.service';
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
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { JwtService } from './services/jwt.service';
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthComponent } from './containers/auth/auth.component';
import { NoAuthGuard } from './containers/auth/no-auth-guard.service';
import { IfRoleDirective } from './directives/if-role.directive';
import { HomeComponent } from './containers/home/home.component';
import { EmployerListComponent } from './containers/employer-list/employer-list.component';
import { EmployeeListComponent } from './containers/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { RolesService } from './services/roles.service';
import { EmployerFormComponent } from './components/employer-form/employer-form.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';




const routes: Routes = [
{
  path: '',
  redirectTo: 'hjem',
  pathMatch: 'full'
},
{
  path: 'hjem',
  component: MainNavComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
  children:[
    {
      path: '',
      component: HomeComponent,
      outlet: 'mainNavContent',
    },
    {
      path: '',
      component: BottomNavComponent,
      outlet: 'mainNavBotNav'
    }
  ]
},
{
  path: 'profil',
  component: MainNavComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
  children:[
    {
      path: '',
      component: ProfileComponent,
      outlet: 'mainNavContent',
    },
    {
      path: '',
      component: BottomNavComponent,
      outlet: 'mainNavBotNav'
    }
  ]
},
{
  path: 'oppdragsgivere',
  component: MainNavComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
  children:[
    {
      path: '',
      component: EmployerListComponent,
      outlet: 'mainNavContent',
    },
    {
      path: '',
      component: BottomNavComponent,
      outlet: 'mainNavBotNav'
    }
  ]
},
{
  path: 'ansatte',
  component: MainNavComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
  children:[
    {
      path: '',
      component: EmployeeListComponent,
      outlet: 'mainNavContent',
    },
    {
      path: '',
      component: BottomNavComponent,
      outlet: 'mainNavBotNav'
    }
  ]
},
{
  path: 'oppdrag',
  component: MainNavComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
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
  path: 'oppdrag/:id/detaljer',
  component: MissionDetailsComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
},
{
  path: 'oppdrag/:missionId/notater/:id',
  component: MissionNoteDetailsComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
},
{
  path: 'login',
  component: AuthComponent,
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
    ImageListComponent,
    AuthComponent,
    IfRoleDirective,
    HomeComponent,
    EmployerListComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployerFormComponent,
    ProfileComponent,
    ProfileFormComponent,
    PasswordFormComponent
  ],
  entryComponents: [
    ImageViewerDialogComponent,
    ConfirmDeleteDialogComponent,
    MissionFormComponent,
    MissionNoteFormComponent,
    EmployeeFormComponent,
    EmployerFormComponent, ],
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
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    MissionsService,
    MissionTypesService,
    EmployersService,
    EmployeesService,
    MissionImagesService,
    RolesService,
    JwtService,
    UserService,
    AuthGuard,
    NoAuthGuard,
    ApiService,
    NgEventBus
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
