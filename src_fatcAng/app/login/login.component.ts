import { AdminActions } from "../admin/admin.actions";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import "rxjs/add/observable/combineLatest";

import { LoginService } from "./login-service";
import { ILoginUserDTO } from "./login-user-dto";
import { LoginActions } from "./login.actions";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["../app.component.css", "./login.component.css"],
  providers: [LoginService],
})
export class LoginComponent {

  public loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  constructor(public loginService: LoginService,
    private actions: LoginActions,
    public fb: FormBuilder,
    private _router: Router,
    private _adminActions: AdminActions) {
  };

  loginUser(event) {
    const loginInfo: ILoginUserDTO = {
      UserName: this.loginForm.value.username,
      Password: this.loginForm.value.password
    };
    this.actions.loginToFatCClient(loginInfo);
  }
}
