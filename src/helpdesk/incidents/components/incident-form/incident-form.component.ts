import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Incident } from '../../../shared/services/incidents/incidents.service';
import { UsersService, User } from '../../../shared/services/users/users.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'incident-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['incident-form.component.scss'],
    template: `
    <div class="incident-form">
      
      <form [formGroup]="form">

        <div class="incident-form__title">
          <label>
            <h3>Incident title/h3>
            <input 
              type="text"
              formControlName="title">
            <div class="error" *ngIf="titleRequired">
              Incident title is required
            </div>
          </label>
        </div>

        <div class="incident-form__fields">
            <label>
                <h3>Incident Description</h3>
                <textarea
                    formControlName="description">
                </textarea>
                <div class="error" *ngIf="descRequired">
                    Incident description is required
                </div>
            </label>
        </div>

        <div class="incident-form__details">

            <div class="incident-form__fields">
              <label>
                <h3>Caller</h3>
                <select formControlName="caller">
                  <option value="">Select caller</option>
                  <option
                    *ngFor="let user of users$ | async"
                    [value]="user.uid">
                    {{ user.lastName }}, {{ user.firstName }}
                  </option>
                </select>
                <div class="error" *ngIf="callerRequired">
                    Incident caller is required
                </div>
              </label>
              <label>
                <h3>Assigned Agent</h3>
                <select formControlName="agent">
                  <option value="">Select agent</option>
                  <option
                    *ngFor="let user of users$ | async"
                    [value]="user.uid">
                    {{ user.lastName }}, {{ user.firstName }}
                  </option>
                </select>
              </label>
              <label>
                <h3>Priority</h3>
                <select formControlName="priority">
                  <option
                    *ngFor="let priority of priorities"
                    [value]="priority.level">
                    {{ priority.label }}
                  </option>
                </select>
              </label>
              <label>
                <h3>Status</h3>
                <select formControlName="status">
                  <option
                    *ngFor="let status of statuses"
                    [value]="status">
                    {{status}}
                  </option>
                </select>
              </label>
            </div>
            <div class="incident-form__fields">
              <label>
                <h3>Work Notes</h3>
                <textarea
                  formControlName="workNotes">
                </textarea>
              </label>
            </div>
            <div class="incident-form__fields">
              <label>
                <h3>Closing Notes</h3>
                <textarea
                  formControlName="closeNotes">
                </textarea>
              </label>
            </div>

        </div>

        <div class="incident-form__submit">
          <div>
            <button
              type="button"
              class="button"
              *ngIf="!exists"
              (click)="createIncident()">
              Create incident
            </button>
            <button
              type="button"
              class="button"
              *ngIf="exists"
              (click)="updateIncident()">
              Save
            </button>
            <a 
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>
          </div>

          <div class="incident-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button 
                class="confirm"
                type="button"
                (click)="removeIncident()">
                Yes
              </button>
              <button 
                class="cancel"
                type="button"
                (click)="toggle()">
                No
              </button>
            </div>

            <button class="button button--delete" type="button" (click)="toggle()">
              Delete
            </button>
          </div>

        </div>

      </form>

    </div>
    `
})
export class IncidentFormComponent implements OnChanges {
    users$: Observable<User[]>;
    toggled = false;
    exists = false;

    statuses = ['New', 'Active', 'Awaiting Info', 'Closed'];

    priorities = [
        { level: 1, label: '1 - High'},
        { level: 2, label: '2 - Moderate'},
        { level: 3, label: '3 - Low'}
    ];
  
    @Input()
    incident: Incident;
  
    @Output()
    create = new EventEmitter<Incident>();
  
    @Output()
    update = new EventEmitter<Incident>();
  
    @Output()
    remove = new EventEmitter<Incident>();
    form = this.fb.group({
        caller: ['', Validators.required],
        agent: '',
        priority: this.priorities[1],
        status: this.statuses[0],
        title: ['', Validators.required],
        description: ['', Validators.required],
        workNotes: '',
        closeNotes: ''
      });

      constructor(
        private fb: FormBuilder,
        usersService: UsersService
      ) {
          this.users$ = usersService.users$;
      }

      ngOnChanges(changes: SimpleChanges) {
        if (this.incident && this.incident.description) {
          this.exists = true;
          const value = this.incident;
          this.form.patchValue(value);
        }
      }

      get callerRequired() {
        return (
          this.form.get('caller').hasError('required') &&
          this.form.get('caller').touched
        );
      }

      get titleRequired() {
        return (
          this.form.get('title').hasError('required') &&
          this.form.get('title').touched
        );
      }

      get descRequired() {
        return (
          this.form.get('description').hasError('required') &&
          this.form.get('description').touched
        );
      }

      createIncident() {
        if (this.form.valid) {
          this.create.emit(this.form.value);
        }
      }
    
      updateIncident() {
        if (this.form.valid) {
          this.update.emit(this.form.value);
        }
      }
    
      removeIncident() {
        this.remove.emit(this.form.value);
      }
    
      toggle() {
        this.toggled = !this.toggled;
      }
}