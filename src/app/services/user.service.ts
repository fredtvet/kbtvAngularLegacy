import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models/user.model';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { Employee } from '../models/employee.model';


@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  public isAuth: boolean = false;

  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) {}


  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token.replace("Bearer ", ""));
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
    this.isAuth = true;
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    this.isAuth = false;
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    console.log(credentials);
    return this.apiService.post('/auth' + route, credentials)
      .pipe(map(
      user => {
        console.log(user);
        this.setAuth(user);
        return user;
      }
    ));
  }

  getCurrentUser(): any{
    return this.apiService.get('/auth');
  }

  getUserRole():string{
    return this.jwtService.getDecodedToken()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  hasValidToken(){
    let token = this.jwtService.getDecodedToken();
    console.log(token);
    if(!token) {
      return false;
    };

    let exp = token['exp'];

    if (Date.now() >= exp * 1000) {
        return false;
    }
    return true;
  }

  updateCurrentUser(user: any)
  {
    return this.apiService
    .put('/auth', user);
  }

  changePassword(oldPw: string, newPw: string){

    const obj = {
      OldPassword: oldPw,
      NewPassword: newPw
    }

    return this.apiService
    .put('/auth/changePassword', obj);
  }

}
