import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import { LoginService } from "../login/login-service";
import { LoginActions } from "../login/login.actions";
import { Router } from "@angular/router";
import { ILoginChallenge, ILoginState } from "../login/login.models";
import { getCookie } from "../shared/cookie-util";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@Component({
  selector: "app-auth-token",
  templateUrl: "./auth.component.html",
  styleUrls: ["../app.component.css"],
  providers: [LoginService],
})

/**
 * AuthComponent logic
 * @author Jeff M.
 * @description Handle logic for 2 factor auth
 */
export class AuthComponent {

  @select(["login"]) userLogin$: Observable<ILoginState>;

  public userLogin: any;

  public authToken = this.fb.group({
    token: ["", Validators.required],
    newPassword: ["", Validators.required],
    creds: {}
  });

  constructor(
    private actions: LoginActions,
    public fb: FormBuilder,
    private _router: Router,
  ) {
    this.userLogin$.subscribe(value => {
      this.userLogin = value;
    });
  };

  UserAuthTokenCheck() {
    const userChallenge: ILoginChallenge = {
      challenge: this.authToken.value.token,
      sessionID: getCookie("login"),
    };

    this.actions.submitAuthToken(userChallenge, this.authToken.value.newPassword);
  }

  public Back() {
this._router.navigate(["/home"]);
  }
}
