import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { UsersService, User } from '../../../shared/services/users/users.service';

@Component({
    selector: 'user',
    styleUrls: ['user.component.scss'],
    template: `
        <div class="user">
            <div class="user__title">
            <h1>
                <img src="/img/user.svg">
                <span *ngIf="user$ | async as user; else title;">
                {{ user.firstName ? 'Edit' : 'Create' }} User
                </span>
                <ng-template #title>
                Loading...
                </ng-template>
            </h1>
            </div>
            <div *ngIf="user$ | async as user; else loading;">
            <user-form
                [user]="user"
                (create)="addUser($event)"
                (update)="updateUser($event)"
                (remove)="removeUser($event)">
                <div class="error" *ngIf="error">
                    {{ error }}
                </div>
            </user-form>
            </div>
            <ng-template #loading>
            <div class="message">
                <img src="/img/loading.svg">
                Fetching user...
            </div>
            </ng-template>
        </div>
    `
})
export class UserComponent implements OnInit, OnDestroy {
    
    user$: Observable<User>;
    subscription: Subscription;
    error: string;
    
    
    constructor(
      private usersService: UsersService,
      private router: Router,
      private route: ActivatedRoute
    ) {}
  
    ngOnInit() {
      this.subscription = this.usersService.users$.subscribe();
      this.user$ = this.route.params
        .switchMap(param => this.usersService.getUser(param.id));
    }
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  
    async addUser(event: User) {
        try {
            await this.usersService.createUser(event);
            //await this.usersService.saveUserData(event);
            this.backToUsers();
        } catch (err) {
            this.error = err.message;
        }
    }
  
    async updateUser(event: User) {
      const key = this.route.snapshot.params.id;
      await this.usersService.updateUser(key, event);
      this.backToUsers();
    }
  
    async removeUser(event: User) {
      const key = this.route.snapshot.params.id;
      await this.usersService.removeUser(key);
      this.backToUsers();
    }
  
    backToUsers() {
      this.router.navigate(['users']);
    }
}