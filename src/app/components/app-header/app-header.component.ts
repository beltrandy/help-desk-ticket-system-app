import { Component, Input, Output, EventEmitter } from "@angular/core";

import { User } from '../../../auth/shared/services/auth/auth.service';

@Component({
  selector: "app-header",
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
  user: User;

  @Output()
  logout = new EventEmitter<any>();
  
  logoutUser() {
    this.logout.emit();
  }
  
}
