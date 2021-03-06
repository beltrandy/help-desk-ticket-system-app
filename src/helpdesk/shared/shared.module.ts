import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// third-party modules
import { AngularFireDatabaseModule } from 'angularfire2/database';

// components
import { ListItemComponent } from './components/list-item/list-item.component';

// services
import { UsersService } from './services/users/users.service';
import { IncidentsService } from './services/incidents/incidents.service';

// pipes
import { IncidentFilterPipe } from './pipes/incidentFilter.pipe';
import { DashboardFilterPipe } from './pipes/dashboardFilter.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    ListItemComponent,
    IncidentFilterPipe,
    DashboardFilterPipe
  ],
  exports: [
    ListItemComponent,
    IncidentFilterPipe,
    DashboardFilterPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        UsersService,
        IncidentsService
      ]
    };
  }
}