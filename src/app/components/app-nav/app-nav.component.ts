import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

import { CurrentUser } from '../../../auth/shared/services/auth/auth.service';

@Component({
  selector: "app-nav",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["app-nav.component.scss"],
  template: `
    <div class="app-nav">
      <div class="wrapper">
        <a routerLink="dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="incidents" routerLinkActive="active">Incidents</a>
        <a routerLink="users" routerLinkActive="active">Users</a>
      </div>
    </div>
  `
})
export class AppNavComponent {

  @Input()
  currentUser: CurrentUser;

  constructor() {
  }

}
