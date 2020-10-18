import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { Store } from 'store';

import { SharedModule } from '../shared/shared.module';

// components
//import { IncidentFormComponent } from '../incidents/components/incident-form/incident-form.component';
import { DashListItemComponent } from '../dashboard/components/dash-list-item/dash-list-item.component';

// containers
import { DashboardComponent } from './containers/dashboard/dashboard.component';
//import { IncidentsComponent } from '../incidents/containers/incidents/incidents.component';
//import { IncidentComponent } from '../incidents/containers/incident/incident.component';

export const ROUTES: Routes = [
    { path: '', component: DashboardComponent },
    //{ path: '', component: IncidentsComponent },
    //{ path: 'new', component: IncidentComponent },
    //{ path: ':id', component: IncidentComponent }
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
        DashListItemComponent
        //IncidentsComponent,
        //IncidentComponent,
        //IncidentFormComponent
      ]
})

export class DashboardModule {}