import { LoginActions } from "../../login/login.actions";
import { Router } from "@angular/router";
import { IUserDTO } from "../data.dto";
import { Component, OnInit } from "@angular/core";
import { getCookie } from "../cookie-util";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["banner.component.scss", "../../app.component.css"]
})


export class BannerComponent implements OnInit {
  @select(["usersInfo", "currentUser"]) displayCurrentUsertype$: Observable<IUserDTO>;
  public test = "";
  public displayCurrentUsertype: IUserDTO;
  public logoutBool = true;
  public navDropDownBool = false;
  public currentUserID: string;
   constructor(
    private _router: Router,
    private _loginActions: LoginActions) {
    this.displayCurrentUsertype$.subscribe(value => {
      this.displayCurrentUsertype = value;
    })
    this.currentUserID = getCookie("UserID");
    this._loginActions.getUserInformation(parseInt(this.currentUserID, 10));
  };

  /**
   * Makes sure to not show profile tab on home screan and auth page.
   */
public checkRoute() {
  const blacklistRoutes: Array<string> = ["/home", "/auth-page"]
  const routeBool = blacklistRoutes.find((r) => r === this._router.url)
  return routeBool;
}

public userLink() {
 this._router.navigate(["/user"]);
}

/**
   * Handles closing the user profile tab
   */
public navDropDown(mousePosition: string) {
  if (mousePosition === "in") {
    this.navDropDownBool = true;
  }
  if (mousePosition === "out") {
    this.navDropDownBool = false;
  }
}

  public ngOnInit() {
    if (this.checkRoute()) {
      this.logoutBool = true
    } else {
      this.logoutBool = false
    }
  }

  public logOutUser() {
      this._loginActions.logoutOfFatCClient();

}
}
