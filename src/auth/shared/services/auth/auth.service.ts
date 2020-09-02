import { Injectable } from "@angular/core";

import { Store } from "store";

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class CallersService {
  constructor() {}
}
