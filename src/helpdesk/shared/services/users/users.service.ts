import { Injectable } from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database";

import { Store } from "store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";

import { AuthService } from "../../../../auth/shared/services/auth/auth.service";
import { FormGroup } from '@angular/forms';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: string;
  title: string;
  office: string;
  uid?: string;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class UsersService {
  users$: Observable<User[]> = this.db
    .list(`users`)
    .do((next) => this.store.set("users", next));

  constructor(
    private store: Store,
    private af: AngularFireAuth,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.currentUser.uid;
  }

  getUser(uid: string) {
    if (!uid) return Observable.of({});
    return this.store
      .select<User[]>("users")
      .filter(Boolean)
      .map((users) => users.find((user: User) => user.$key === uid));
  }

  createUser(userObj: User) {
    return this.af.auth
      .createUserWithEmailAndPassword(userObj.email, userObj.password)
      .then(user => {
        return this.db.object(`users/${user.uid}`).set({
          email: user.email,
          uid: user.uid,
          firstName: userObj.firstName,
          lastName: userObj.lastName,
          role: userObj.role,
          title: userObj.title,
          office: userObj.office
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  updateUser(uid: string, user: User) {
    return this.db.object(`users/${uid}`).update(user);
  }

  removeUser(uid: string) {
    return this.db.list(`users`).remove(uid);
  }
}
