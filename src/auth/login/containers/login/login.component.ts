import { Component } from "@angular/core";

@Component({
  selector: "login",
  template: `
    <div>
      <auth-form>
        <h1>Login</h1>
        <button type="submit">Login</button>
        <div class="error" *ngIf="error">
          {{ error }}
        </div>
      </auth-form>
    </div>
  `,
})
export class LoginComponent {

  error: string;

  constructor() {}
}
