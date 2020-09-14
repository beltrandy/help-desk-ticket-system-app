import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

import { User } from '../../../auth/shared/services/auth/auth.service';

@Component({
  selector: "app-nav",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["app-nav.component.scss"],
  template: `
    <div class="app-nav">
      <div class="wrapper">
        <a routerLink="incidents" routerLinkActive="active">Incidents</a>
        <a routerLink="incidents" routerLinkActive="active">Callers</a>
        <a routerLink="callers" routerLinkActive="active">Admin</a>
      </div>
    </div>
  `
})
export class AppNavComponent {

  @Input()
  user: User;

  constructor() {
  }

}
