import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store } from "store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { IncidentsService, Incident } from "../../../shared/services/incidents/incidents.service";

@Component({
  selector: "incidents",
  styleUrls: ["incidents.component.scss"],
  template: `
    <div class="incidents">
      <div class="incidents__title">
        <h1>
          <img src="/img/incident.svg" />
          All Incidents
        </h1>
        <a class="btn__add" [routerLink]="['../incidents/new']">
          <img src="/img/add-white.svg" />
          New incident
        </a>
      </div>
      <div class="incidents__search">
        <input
          #search
          (keydown)="updateSearch(search.value)"
          placeholder="search text goes here"
        />
      </div>
      <div *ngIf="incidents$ | async as incidents; else loading">
        <div class="message" *ngIf="!incidents.length">
          <img src="/img/face.svg" />
          No incidents, add a new incident to start
        </div>
        <list-item
          *ngFor="let incident of incidents | incidentFilter: searchText"
          [item]="incident"
          (remove)="removeIncident($event)"
        >
        </list-item>
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
export class IncidentsComponent implements OnInit, OnDestroy {
  incidents$: Observable<Incident[]>;
  subscription: Subscription;
  searchText: string;

  constructor(
    private store: Store,
    private incidentsService: IncidentsService
  ) {}

  ngOnInit() {
    this.incidents$ = this.store.select<Incident[]>("incidents");
    this.subscription = this.incidentsService.incidents$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeIncident(event: Incident) {
    this.incidentsService.removeIncident(event.$key);
  }

  updateSearch(search: string) {
    this.searchText = search;
  }
}
