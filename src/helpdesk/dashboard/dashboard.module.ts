import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { Store } from 'store';

import { SharedModule } from '../shared/shared.module';

// components
import { DashListItemComponent } from '../dashboard/components/dash-list-item/dash-list-item.component';

// containers
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DashIncidentComponent } from './containers/dash-incident/dash-incident.component';

export const ROUTES: Routes = [
    { path: '', component: DashboardComponent },
    { path: ':id', component: DashIncidentComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
      ],
      declarations: [
        DashboardComponent,
        DashListItemComponent,
        DashIncidentComponent
      ]
})

export class DashboardModule {}