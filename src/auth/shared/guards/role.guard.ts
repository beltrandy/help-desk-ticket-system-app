import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from 'store';
import { CurrentUser } from '../services/auth/auth.service';

import 'rxjs/add/operator/map';

import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  
  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {

    let allowedRolesObj = route.data;
    let allowedRolesArray = allowedRolesObj.allowedRoles;
    let hasAllowedRole = false;

    return this.store.select<CurrentUser>('currentUser')
      .map( (currentUser) => {
        
        for(let i=0; i < allowedRolesArray.length; i++) {
          if (allowedRolesArray[i] === currentUser.role) {
            hasAllowedRole = true
          }
        }
        
        if (!hasAllowedRole) {
            this.router.navigate(['/dashboard']);
        }
        return hasAllowedRole
      });
  }
}