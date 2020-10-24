import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dash-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['dash-list-item.component.scss'],
  template: `
    <div class="dash-list-item">

    <a [routerLink]="getRoute(item, user)">

        <p class="dash-list-item__name">
          Created: {{ item.created | date:'short' }} - {{ item.title }}
        </p>

    </a>

    </div>
  `
})
export class DashListItemComponent {

  @Input()
  item: any;

  @Input()
  user: any;

  constructor() {}

  getRoute(item: any, user: any) {
    let currentType = '';

    if (user.role === 'caller') {
      currentType = 'dashboard'
    } else {
      currentType = 'incidents'
    }
    
    return [
      `../${ currentType }`,
      item.$key
    ];
  }

}