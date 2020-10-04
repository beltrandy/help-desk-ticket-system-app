import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/shared/guards/auth.guard';

export const ROUTES: Routes = [
  { path: 'users', canActivate: [AuthGuard], loadChildren: './users/users.module#UsersModule' },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class HelpDeskModule {}