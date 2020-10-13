import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

// containers
import { DashboardComponent } from './containers/dashboard/dashboard.component';

export const ROUTES: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
      ],
      declarations: [
        DashboardComponent
      ]
})
export class DashboardModule {}