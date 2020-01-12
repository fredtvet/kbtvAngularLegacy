import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user.service';
import { take } from 'rxjs/operators';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {

    if(!this.userService.hasValidToken()){
        return this.router.navigate(['/login']);
    }

    if(route.data['allowedRoles']){
      if(!route.data['allowedRoles'].includes(this.userService.getUserRole())){
        return this.router.navigate(['/login']); //Should navigate to a forbidden component
      }
    }

    return true;
  }
}
