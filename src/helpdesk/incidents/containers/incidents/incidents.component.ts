import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store } from "store";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { IncidentsService, Incident } from '../../../shared/services/incidents/incidents.service';

@Component({
  selector: "incidents",
  styleUrls: ["incidents.component.scss"],
  template: ` <div>INCIDENTS</div> `,
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
