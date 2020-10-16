import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

import { Store } from "store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";

export interface Incident {
  caller: string;
  agent: string;
  priority: number;
  status: string;
  title: string;
  description: string;
  workNotes: string;
  closeNotes: string;
  created: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class IncidentsService {
  incidents$: Observable<Incident[]> = this.db
    .list(`incidents`, { query: {
      orderByChild: 'created'
    } })
    .do((next) => this.store.set("incidents", next));

  constructor(private store: Store, private db: AngularFireDatabase) {}

  getIncident(key: string) {
    if (!key) return Observable.of({});
    return this.store
      .select<Incident[]>("incidents")
      .filter(Boolean)
      .map((incidents) =>
        incidents.find((incident: Incident) => incident.$key === key)
      );
  }

  addIncident(incident: Incident) {
    console.log("Incident:", incident);
    return this.db.list(`incidents`).push(incident);
  }

  updateIncident(key: string, incident: Incident) {
    return this.db.object(`incidents/${key}`).update(incident);
  }

  removeIncident(key: string) {
    return this.db.list(`incidents`).remove(key);
  }
}
