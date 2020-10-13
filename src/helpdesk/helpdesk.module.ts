import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// shared modules
import { SharedModule } from './shared/shared.module';

// guards
import { AuthGuard } from '../auth/shared/guards/auth.guard';
import { RoleGuard } from '../auth/shared/guards/role.guard';

export const ROUTES: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'incidents',
    canActivate: [AuthGuard,RoleGuard],
    data: {
      allowedRoles: ['admin', 'agent']
    },
    loadChildren: './incidents/incidents.module#IncidentsModule'
  },
  {
    path: 'users',
    canActivate: [AuthGuard,RoleGuard],
    data: {
      allowedRoles: ['admin']
    },
    loadChildren: './users/users.module#UsersModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ]
})
export class HelpDeskModule {}