import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['list-item.component.scss'],
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">

        <p
          class="list-item__name"
          *ngIf="item.firstName; else showIncident">
          {{ item.firstName }}
        </p>
        <ng-template #showIncident>
          {{ item.title }}
        </ng-template>

      </a>

      <div 
        class="list-item__delete"
        *ngIf="toggled">
        <p>Delete item?</p>
        <button 
          class="confirm"
          type="button"
          (click)="removeItem()">
          Yes
        </button>
        <button 
          class="cancel"
          type="button"
          (click)="toggle()">
          No
        </button>
      </div>

      <button 
        class="trash"
        type="button"
        (click)="toggle()">
        <img src="/img/remove.svg">
      </button>

    </div>
  `
})
export class ListItemComponent {

  toggled = false;

  @Input()
  item: any;

  @Output()
  remove = new EventEmitter<any>();

  constructor() {}

  toggle() {
    this.toggled = !this.toggled;
  }

  removeItem() {
    this.remove.emit(this.item);
  }

  getRoute(item: any) {
    let currentType = '';

    if (item.firstName) {
      currentType = 'users'
    } else {
      currentType = 'incidents'
    }
    
    return [
      `../${ currentType }`,
      item.$key
    ];
  }
}