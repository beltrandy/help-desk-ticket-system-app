import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// third-party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

export const ROUTES: Routes = [];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyAsHHTjlzCIRDzojJg9Em-jMnPcx-2sCS4",
  authDomain: "hdts-app.firebaseapp.com",
  databaseURL: "https://hdts-app.firebaseio.com",
  projectId: "hdts-app",
  storageBucket: "hdts-app.appspot.com",
  messagingSenderId: "658584982023"
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ]
})
export class AuthModule {}