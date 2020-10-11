import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { IncidentsService, Incident } from '../../../shared/services/incidents/incidents.service';

@Component({
    selector: 'incident',
    styleUrls: ['incident.component.scss'],
    template: `
        <div class="incident">
            <div class="incident__title">
                <h1>
                    <img src="/img/incident.svg">
                    <span *ngIf="incident$ | async as incident; else title;">
                    {{ incident.description ? 'Edit' : 'Create' }} Incident
                    </span>
                    <ng-template #title>
                    Loading...
                    </ng-template>
                </h1>
            </div>
            <div *ngIf="incident$ | async as incident; else loading;">
                <incident-form
                    [incident]="incident"
                    (create)="addIncident($event)"
                    (update)="updateIncident($event)"
                    (remove)="removeIncident($event)">
                </incident-form>
            </div>
            <ng-template #loading>
                <div class="message">
                    <img src="/img/loading.svg">
                    Fetching incident...
                </div>
            </ng-template>
        </div>
    `
})
export class IncidentComponent implements OnInit, OnDestroy {
    
    incident$: Observable<Incident>;
    subscription: Subscription;
    
    constructor(
      private incidentsService: IncidentsService,
      private router: Router,
      private route: ActivatedRoute
    ) {}
  
    ngOnInit() {
      this.subscription = this.incidentsService.incidents$.subscribe();
      this.incident$ = this.route.params
        .switchMap(param => this.incidentsService.getIncident(param.id));
    }
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  
    async addIncident(event: Incident) {
      event.created = new Date().getTime();
      await this.incidentsService.addIncident(event);
      this.backToIncidents();
    }
  
    async updateIncident(event: Incident) {
      const key = this.route.snapshot.params.id;
      await this.incidentsService.updateIncident(key, event);
      this.backToIncidents();
    }
  
    async removeIncident(event: Incident) {
      const key = this.route.snapshot.params.id;
      await this.incidentsService.removeIncident(key);
      this.backToIncidents();
    }
  
    backToIncidents() {
      this.router.navigate(['incidents']);
    }
}