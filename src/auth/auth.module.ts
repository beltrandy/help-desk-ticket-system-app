import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// third-party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// shared modules
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' }
    ]
  }
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDDbk3x3zF_Oah34PP_cHrtIr7rZsxmjkI",
  authDomain: "hdts-application.firebaseapp.com",
  databaseURL: "https://hdts-application.firebaseio.com",
  projectId: "hdts-application",
  storageBucket: "hdts-application.appspot.com",
  messagingSenderId: "230861801875"
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {}