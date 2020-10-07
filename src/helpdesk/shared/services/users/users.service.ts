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

export interface User {
  email: string;
  uid: string;
  role: string;
  firstName: string;
  lastName: string;
  title: string;
  office: string;
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
      .map((users) => users.find((user: User) => user.uid === uid));
  }

  createUser(email: string, password: string) {
    return this.af.auth
      .createUserWithEmailAndPassword(email, password);
  }

  saveUserData(user: User) {
    return this.db.list(`users`).push(user);
  }

  updateUser(uid: string, user: User) {
    return this.db.object(`users/${uid}`).update(user);
  }

  removeUser(uid: string) {
    return this.db.list(`users`).remove(uid);
  }
}
