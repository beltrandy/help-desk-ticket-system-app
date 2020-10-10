import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

// components
import { UserFormComponent } from './components/user-form/user-form.component';

// containers
import { UsersComponent } from './containers/users/users.component';
import { UserComponent } from './containers/user/user.component';

export const ROUTES: Routes = [
    { path: '', component: UsersComponent },
    { path: 'new', component: UserComponent },
    { path: ':id', component: UserComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ],
    declarations: [
        UsersComponent,
        UserComponent,
        UserFormComponent
    ]
})
export class UsersModule {}