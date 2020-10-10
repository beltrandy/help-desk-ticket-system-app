import { Injectable } from "@angular/core";

import { Store } from "store";

import "rxjs/add/operator/do";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';

export interface CurrentUser {
  email: string;
  uid: string;
  authenticated: boolean;
  role: string;
}

@Injectable()
export class AuthService {
  auth$ = this.af.authState
    .do((next) => {
      if (!next) {
        this.store.set("currentUser", null);
        return;
    }
    this.getRole().then(snapshot => {
      const currentUser: CurrentUser = {
        email: next.email,
        uid: next.uid,
        authenticated: true,
        role: snapshot.val()
      };
      console.log("currentUser: ", currentUser);
      this.store.set('currentUser', currentUser);
    });
  });

  constructor(
    private store: Store,
    private af: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}

  get currentUser() {
    return this.af.auth.currentUser;
  }

  get authState() {
    return this.af.authState;
  }

  getRole() {
    return this.db.database.ref('users').child(this.currentUser.uid).child('role').once('value');
  }

  loginUser(email: string, password: string) {
    return this.af.auth
      .signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.af.auth.signOut();
  }
}
