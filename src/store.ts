import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';

import { CurrentUser } from './auth/shared/services/auth/auth.service';
import { User } from './helpdesk/shared/services/users/users.service';

export interface State {
  currentUser: CurrentUser,
  selected: any,
  list: any,
  users: User[],
  [key: string]: any
}

const state: State = {
  currentUser: undefined,
  selected: undefined,
  list: undefined,
  users: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().distinctUntilChanged();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pluck(name);
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
