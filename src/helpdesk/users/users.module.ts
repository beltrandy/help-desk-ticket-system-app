import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// containers
import { UsersComponent } from './containers/users/users.component';

export const ROUTES: Routes = [
    { path: '', component: UsersComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        UsersComponent
    ]
})
export class UsersModule {}