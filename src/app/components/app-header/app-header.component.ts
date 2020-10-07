import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

import { CurrentUser } from '../../../auth/shared/services/auth/auth.service';

@Component({
  selector: "app-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["app-header.component.scss"],
  template: `
    <div class="app-header">
      <div class="wrapper">
        <div>
          <img src="/img/hdts-logo.svg">
          <div>Help Desk Ticket System</div>
        </div>
        <div 
          class="app-header__user-info"
          *ngIf="user?.authenticated">
          <span (click)="logoutUser()"></span>
        </div>
      </div>
    </div>
  `
})
export class AppHeaderComponent {

  @Input()
  currentUser: CurrentUser;

  @Output()
  logout = new EventEmitter<any>();
  
  logoutUser() {
    this.logout.emit();
  }

}
