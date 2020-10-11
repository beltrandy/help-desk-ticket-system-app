import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

// components
import { IncidentFormComponent } from './components/incident-form/incident-form.component';

// containers
import { IncidentsComponent } from './containers/incidents/incidents.component';
import { IncidentComponent } from './containers/incident/incident.component';

export const ROUTES: Routes = [
    { path: '', component: IncidentsComponent },
    { path: 'new', component: IncidentComponent },
    { path: ':id', component: IncidentComponent }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
      ],
      declarations: [
        IncidentsComponent,
        IncidentComponent,
        IncidentFormComponent
      ]
})

export class IncidentsModule {}