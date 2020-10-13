import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { UsersService, User } from '../../../shared/services/users/users.service';

@Component({
    selector: 'user-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['user-form.component.scss'],
    template: `
    <div class="user-form">
      
      <form [formGroup]="form">

        <div class="user-form__name">
          <label>
            <h3>First name</h3>
            <input 
              type="text"
              formControlName="firstName">
            <div class="error" *ngIf="fNameRequired">
              First name is required
            </div>
          </label>

          <label>
            <h3>Last name</h3>
            <input 
              type="text"
              formControlName="lastName">
            <div class="error" *ngIf="lNameRequired">
              Last name is required
            </div>
          </label>
        </div>

        <div class="user-form__details">

            <div class="user-form__fields">
              <label>
                <h3>Email</h3>
                <input
                type="email"
                formControlName="email">
                <div class="error" *ngIf="emailFormat">
                    Invalid email format
                </div>
              </label>

              <label *ngIf="!exists">
                <h3>Password</h3>
                <input
                type="password"
                formControlName="password">
              </label>

              <label>
                <h3>Role</h3>
                <select formControlName="role">
                  <option
                    *ngFor="let role of roles"
                    [value]="role">
                    {{role}}
                  </option>
                </select>
                <div class="error" *ngIf="roleRequired">
                    Role is required
                </div>
              </label>
            </div>
            
            <div class="user-form__fields">
              <label>
                <h3>Title</h3>
                <input
                type="text"
                formControlName="title">
              </label>

              <label>
                <h3>Office</h3>
                <input
                type="text"
                formControlName="office">
              </label>
            </div>

        </div>

        <div class="user-form__submit">
          <div>
            <button
              type="button"
              class="button"
              *ngIf="!exists"
              (click)="createUser()">
              Create user
            </button>
            <button
              type="button"
              class="button"
              *ngIf="exists"
              (click)="updateUser()">
              Save
            </button>
            <a 
              class="button button--cancel"
              [routerLink]="['../']">
              Cancel
            </a>
          </div>

          <div class="user-form__delete" *ngIf="exists">
            <div *ngIf="toggled">
              <p>Delete item?</p>
              <button 
                class="confirm"
                type="button"
                (click)="removeUser()">
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
export class UserFormComponent implements OnChanges {
    toggled = false;
    exists = false;

    roles = [ 'caller', 'agent', 'admin' ];
  
    @Input()
    user: User;
  
    @Output()
    create = new EventEmitter<User>();
  
    @Output()
    update = new EventEmitter<User>();
  
    @Output()
    remove = new EventEmitter<User>();
    form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.email],
        password: '',
        role: ['', Validators.required],
        title: '',
        office: ''
      });

      constructor(
        private fb: FormBuilder
      ) {}

      ngOnChanges(changes: SimpleChanges) {
        if (this.user && this.user.firstName) {
          this.exists = true;
          const value = this.user;
          this.form.patchValue(value);
        }
      }

      get fNameRequired() {
        return (
          this.form.get('firstName').hasError('required') &&
          this.form.get('firstName').touched
        );
      }

      get lNameRequired() {
        return (
          this.form.get('lastName').hasError('required') &&
          this.form.get('lastName').touched
        );
      }

      get emailFormat() {
        const control = this.form.get('email');
        return control.hasError('email') && control.touched;
      }

      // get passwordInvalid() {
      //   const control = this.form.get('password');
      //   return control.hasError('required') && control.touched;
      // }

      get roleRequired() {
        return (
          this.form.get('role').hasError('required') &&
          this.form.get('role').touched
        );
      }

      createUser() {
        if (this.form.valid) {
          this.create.emit(this.form.value);
        }
      }
    
      updateUser() {
        console.log("Is form valid: ", this.form.valid);
        if (this.form.valid) {
          console.log("Form is valid");
          this.update.emit(this.form.value);
        }
      }
    
      removeUser() {
        this.remove.emit(this.form.value);
      }
    
      toggle() {
        this.toggled = !this.toggled;
      }
}