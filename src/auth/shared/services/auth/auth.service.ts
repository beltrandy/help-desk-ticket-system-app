import { Injectable } from "@angular/core";

import { Store } from "store";

import { AngularFireAuth } from 'angularfire2/auth';

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {

  constructor(
    private af: AngularFireAuth,
  ) {}

  get user() {
    return this.af.auth.currentUser;
  }

  get authState() {
    return this.af.authState;
  }
}
