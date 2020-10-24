import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { IncidentsService, Incident } from '../../../shared/services/incidents/incidents.service';
import { User, UsersService } from '../../../shared/services/users/users.service';

@Component({
    selector: 'dash-incident',
    styleUrls: ['dash-incident.component.scss'],
    template: `
    <div class="dash-incident">
    <div class="dash-incident__title">
        <h1>
            <img src="/img/incident.svg">
            <span>
            Incident Details
            </span>
        </h1>
    </div>
    <div *ngIf="incident$ | async as incident; else title;">
      
      <div class="dash-incident__title">
        <label>
          <h3>Incident title</h3>
          <div class="dash-incident__fieldInfo">
            {{ incident.title }}
          </div>
        </label>
      </div>

      <div class="dash-incident__details">
          <div class="dash-incident__fields">
            <label>
              <h3>Incident Description</h3>
              <div class="dash-incident__fieldInfo">
              {{ incident.description }}
            </div>
            </label>
          </div>
          <div class="dash-incident__fields">
            <label>
              <h3>Caller</h3>
              <div 
                class="dash-incident__fieldInfo">
                  {{ getAgentName(incident.caller) }}
              </div>
            </label>
            <label>
              <h3>Assigned Agent</h3>
              <div 
                class="dash-incident__fieldInfo">
                  {{ getAgentName(incident.agent) }}
              </div>
            </label>
          </div>
          <div class="dash-incident__fields">
            <label>
              <h3>Priority</h3>
              <div
              *ngIf="getPriorityLabel(incident.priortiy) as priority" 
              class="dash-incident__fieldInfo">
                {{ priority }}
          </div>
            </label>
            <label>
              <h3>Status</h3>
              <div class="dash-incident__fieldInfo">
              {{ incident.status }}
          </div>
            </label>
          </div>
          <div class="dash-incident__fields">
            <label>
              <h3>Work Notes</h3>
              <div class="dash-incident__fieldInfo">
                {{ incident.workNotes ? incident.workNotes : '&nbsp;' }}
              </div>
            </label>
          </div>
          <div class="dash-incident__fields">
            <label>
              <h3>Closing Notes</h3>
              <div class="dash-incident__fieldInfo">
                {{ incident.closeNotes ? incident.closeNotes : '&nbsp;' }}
              </div>
            </label>
          </div>

      </div>
      <div class="dash-incident__submit">
          <div>
            <button
              type="button"
              class="button"
              (click)="backToDashboard()">
                Return to Dashboard
            </button>
          </div>
      </div>

  </div>

  <ng-template #title>
    Loading...
  </ng-template>

</div>
    `
})
export class DashIncidentComponent implements OnInit, OnDestroy {
    usersById: any = {};
    incident$: Observable<Incident>;
    users$: Observable<User[]>;
    subscription: Subscription;
    priority: string;
    
    constructor(
      private incidentsService: IncidentsService,
      private router: Router,
      private route: ActivatedRoute,
      private usersService: UsersService
    ) {}
  
    ngOnInit() {
        this.usersService.users$.subscribe((user: any) => {
            user.forEach((_user: any) => {
                this.usersById[_user.uid] = `${_user.lastName}, ${_user.firstName}`
            });
        })
        console.log(this.usersById, "userById");
        this.subscription = this.incidentsService.incidents$.subscribe();
        this.incident$ = this.route.params
            .switchMap(param => this.incidentsService.getIncident(param.id));
    }

    getAgentName(id: string) {
        console.log(this.usersById,id);
        return this.usersById[id];
    }
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    getPriorityLabel(value: number) {
        if (value === 1) {
            this.priority = '1 - High'
        } else if (value === 2) {
            this.priority = '2 - Moderate'
        } else {
            this.priority = '3 - Low'
        }

        return this.priority

    } 

    backToDashboard() {
        this.router.navigate(['incidents']);
    }
}