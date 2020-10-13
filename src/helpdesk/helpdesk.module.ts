import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// shared modules
import { SharedModule } from './shared/shared.module';

// guards
import { AuthGuard } from '../auth/shared/guards/auth.guard';

export const ROUTES: Routes = [
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'users', canActivate: [AuthGuard], loadChildren: './users/users.module#UsersModule' },
  { path: 'incidents', canActivate: [AuthGuard], loadChildren: './incidents/incidents.module#IncidentsModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ]
})
export class HelpDeskModule {}