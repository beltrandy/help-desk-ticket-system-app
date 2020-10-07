import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UsersService, User } from '../../../shared/services/users/users.service';

@Component({
    selector: 'users',
    styleUrls: ['users.component.scss'],
    template: `
    <div class="users">
    <div class="users__title">
      <h1>
        <img src="/img/user.svg">
        All Callers
      </h1>
      <a 
        class="btn__add"
        [routerLink]="['../users/new']">
        <img src="/img/add-white.svg">
        New user
      </a>
    </div>
    <div *ngIf="users$ | async as users; else loading;">
      <div class="message" *ngIf="!users.length">
        <img src="/img/face.svg">
        No users, add a new user to start
      </div>
      <list-item
        *ngFor="let user of users"
        [item]="user"
        (remove)="removeCaller($event)">
      </list-item>
    </div>
    <ng-template #loading>
      <div class="message">
        <img src="/img/loading.svg">
        Fetching users...
      </div>
    </ng-template>
  </div>
    `
})
export class UsersComponent implements OnInit, OnDestroy {
    
    users$: Observable<User[]>;
    subscription: Subscription;
  
    constructor(
      private store: Store,
      private usersService: UsersService
    ) {}
  
    ngOnInit() {
      this.users$ = this.store.select<User[]>('users');
      this.subscription = this.usersService.users$.subscribe();
    }
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  
    removeUser(event: User) {
      this.usersService.removeUser(event.uid);
    }
}