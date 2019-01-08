import { UserActions } from "./user.actions";
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import { LoginService } from "../login/login-service";
import { Router } from "@angular/router";
import { ILoginState } from "../login/login.models";
import { IUserDTO } from "../shared/data.dto";

///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////

@Component({
  selector: "app-auth-token",
  templateUrl: "./user.component.html",
  styleUrls: ["../app.component.css"],
  providers: [LoginService],
})
export class UserComponent {

  @select(["login"]) userLogin$: Observable<ILoginState>;
  @select(["usersInfo", "currentUser"]) currentUser$: Observable<IUserDTO>;

    public currentUser: IUserDTO;
    public UserInfo = this.fb.group({
    email: ["", Validators.required],
    changepassword: ["", Validators.required],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    userName: ["", Validators.required],
  });

  constructor(
    public _userActions: UserActions,
    public fb: FormBuilder,
    private _router: Router,
  ) {
    this.currentUser$.subscribe(value => {
      this.currentUser = value;
    });
  };

  public UserUpdateSubmit() {

      const editUserForm: IUserDTO = {
        id: this.currentUser.id,
        email: this.UserInfo.value.email || this.currentUser.email,
        passwordHash: this.currentUser.passwordHash,
        firstName: this.UserInfo.value.firstName || this.currentUser.firstName,
        lastName: this.UserInfo.value.lastName || this.currentUser.lastName,
        tempPass: "",
        pwUserInput: "",
        authCode: this.currentUser.authCode,
        userName: this.UserInfo.value.userName || this.currentUser.userName,
        configuration: this.currentUser.configuration,
        isAdmin: this.currentUser.isAdmin,
      };
      this._userActions.updateUser(editUserForm);
      if (this.UserInfo.value.changepassword !== "" && this.UserInfo.value.changepassword !== undefined) {
        const userNameAndPasswordUpdate: Object = {
          userName: this.currentUser.userName,
          password: this.UserInfo.value.changepassword
        };
        this._userActions.updateUsersPassword(userNameAndPasswordUpdate);
      }

      // this is needed so inputs don't stick around after submit.
      this.UserInfo.reset({
        email: "",
        changepassword: "",
        firstName: "",
        lastName: "",
        userName: "",
      })
  }

  public Back() {
    this._router.navigate(["/cases"]);
  }
}
