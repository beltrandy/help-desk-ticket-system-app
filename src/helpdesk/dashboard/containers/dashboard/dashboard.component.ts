import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store } from "store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { IncidentsService, Incident } from "../../../shared/services/incidents/incidents.service";

import { CurrentUser } from '../../../../auth/shared/services/auth/auth.service';

@Component({
  selector: "dashboard",
  styleUrls: ["dashboard.component.scss"],
  template: `
    <div 
      class="dashboard"
      *ngIf="currentUser$ | async as cuser">
      <div class="dashboard__title">
        <h1>
          <img src="/img/incident.svg" />
          My {{ cuser.role === 'caller' ? 'Submitted' : 'Assigned' }} Incidents
        </h1>
      </div>
      <div *ngIf="(incidents$ | async)?.reverse() as incidents; else loading">
        <div class="message" *ngIf="!incidents.length">
          <img src="/img/face.svg" />
          No incidents, add a new incident to start
        </div>
        <dash-list-item
          *ngFor="let incident of incidents | dashboardFilter: cuser.role: cuser.uid"
          [item]="incident"
          [user]="cuser"
        >
        </dash-list-item>
        <div class="message"
          *ngIf="(incidents | dashboardFilter: cuser.role: cuser.uid).length === 0">
          No incidents found associated to your account
        </div>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg" />
          Fetching incidents...
        </div>
      </ng-template>
    </div>
  `,
})
export class DashboardComponent implements OnInit, OnDestroy {
  incidents$: Observable<Incident[]>;
  subscription: Subscription;
  currentUser$: Observable<CurrentUser>;

  constructor(
    private store: Store,
    private incidentsService: IncidentsService,
  ) {}

  ngOnInit() {
    this.currentUser$ = this.store.select<CurrentUser>('currentUser');
    this.incidents$ = this.store.select<Incident[]>("incidents");
    this.subscription = this.incidentsService.incidents$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
