import { AdminActions } from "../admin/admin.actions";
import { CaseConfigurationService } from "../case-configuration/case-configuration.service";
import { Router } from "@angular/router";
import { LoginService } from "./login-service";
import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AjaxTrio } from "../shared/ajaxTrio.class";
import { IAppState } from "../store";
import { ILoginUserDTO } from "./login-user-dto";
import { ESessionState, ILoginChallenge, ILoginState } from "./login.models";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@Injectable()
export class LoginActions {

  static LOGIN_TO_FATC_AJAX_TRIO = new AjaxTrio(
    "LOGIN_TO_FATC_AJAX_TRIO",
    "Checking loggin information...",
    "Wecome!",
    "There was an error with your username/password combination. Please try again or contact your administrator. "
  );

  static GET_USER_INFO_LOGIN_AJAX_TRIO = new AjaxTrio(
    "GET_USER_INFO_LOGIN_AJAX_TRIO",
    "Trying to get user information...",
    "Successfully got user information!",
    "Failed to get user information!"
  );

  static LOGOUT_OF_FATC_AJAX_TRIO = new AjaxTrio(
    "LOGOUT_OF_FATC_AJAX_TRIO",
    "Attempting to logout of fatc...",
    "Successfully logged out of fatc!",
    "Failed logged out of fatc!"
  );

  static GET_USER_FROM_COOKIE_AJAX_TRIO = new AjaxTrio(
    "GET_USER_FROM_COOKIE_AJAX_TRIO",
    "Attempting to get user...",
    "Successfully got user!",
    "Failed to get user!"
  );

  static CHECK_USER_AUTH_AJAX_TRIO = new AjaxTrio(
    "CHECK_USER_AUTH_AJAX_TRIO",
    "Attempting to check if auth...",
    "Token Accepted",
    "Authentication failed. Please try again or contact your administrator. "
  );

  static CHANGE_USER_PASSWORD_BY_USER_AJAX_TRIO = new AjaxTrio(
    "CHANGE_USER_PASSWORD_BY_USER_AJAX_TRIO",
    "Attempting to change user password...",
    "Successfully changed user password!",
    "Failed to change user password!"
  );

  constructor(private _ngRedux: NgRedux<IAppState>,
    private _loginService: LoginService,
    private _caseConfigService: CaseConfigurationService,
    private _adminActions: AdminActions,
    private _router: Router) {
  }

  afterValidLogin(loginInfo: ILoginState) {
    // after we login, one of three things happens
    // 1 - we are an admin, skip to the admin page
    // 2 - we logged in but require 2fa/challenge, go to that page first
    // 3 - we logged in. go to cases
    let target = "";
     if (loginInfo.state === ESessionState.Challenge) {
      target = "/auth-page";
    } else {
      target = "/cases";
    }
    if (loginInfo.isAdmin === true) {
      target = "/admin-page";
    }
    if (loginInfo.userName === "Jeremy") {
      target = "/cases";
    }

    this._router.navigate([target]);
  }

  /**
   * Login to fat-c application
   * upon success will save the success "token," to state
   * Will also place the cookie to fix reload issues
   * if user is a admin direct them to only manage users page
   * @param userLoginInfo - DTO of user id and password
   */
  loginToFatCClient(userLoginInfo: ILoginUserDTO) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      LoginActions.LOGIN_TO_FATC_AJAX_TRIO);

    this._loginService.postCurrentUser(userLoginInfo)
      .then(loginInfo => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, LoginActions.LOGIN_TO_FATC_AJAX_TRIO, { loginInfo });
        this.afterValidLogin(loginInfo);
      })
      .catch(error => {
        AjaxTrio.dispatchErrorAction(this._ngRedux, LoginActions.LOGIN_TO_FATC_AJAX_TRIO, "");
      });
  }

  /**
   * Check 2nd auth for login to fat-c
   * upon success will allow login to fat-c
   * Will also place the cookie to session
   * @param authToken - token emailed to user by admins
   */
  submitAuthToken(authToken: ILoginChallenge, newUserPassword: string) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      LoginActions.CHECK_USER_AUTH_AJAX_TRIO);

    this._loginService.checkUserAuthToken(authToken)
      .then((loginInfo: ILoginState) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, LoginActions.CHECK_USER_AUTH_AJAX_TRIO, { loginInfo });
        // we challenged OK, just go to cases now
        // check to see if user wanted to change their password
        if (newUserPassword !== "") {
          const passwordObject: Object = {"password": newUserPassword}
          this.sendUserNewPassword(passwordObject)
        }
        this.getUserInformation(loginInfo.userID);
        this._router.navigate(["/cases"]);
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, LoginActions.CHECK_USER_AUTH_AJAX_TRIO, ""));
  }

  /**
   * User changes password after login to fat-c
   * @param newPassword - New password created by user
   */
  sendUserNewPassword(newPassword: Object) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      LoginActions.CHANGE_USER_PASSWORD_BY_USER_AJAX_TRIO);
    this._loginService.userChangePassword(newPassword)
      .then((successMessage) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, LoginActions.CHANGE_USER_PASSWORD_BY_USER_AJAX_TRIO, { successMessage });
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, LoginActions.CHANGE_USER_PASSWORD_BY_USER_AJAX_TRIO, error));
  }

  /**
   * Grabs user again if cookie is present
   * upon success will save the success "token," to state
   * Will also place the cookie to fix reload issues on case-configuration page
   * @param UserId: number
   */
  getCookieSession(sessionID: string) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      LoginActions.GET_USER_FROM_COOKIE_AJAX_TRIO);

    return this._loginService.getCookieSession(sessionID)
      .then(loginInfo =>
        AjaxTrio.dispatchSuccessAction(this._ngRedux, LoginActions.GET_USER_FROM_COOKIE_AJAX_TRIO, { loginInfo }))
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, LoginActions.GET_USER_FROM_COOKIE_AJAX_TRIO, error));
  }

  /**
   * Logout of fat-c application
   * upon success will Delete "token," from state
   * @param none
   */
  logoutOfFatCClient() {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      LoginActions.LOGOUT_OF_FATC_AJAX_TRIO);

    this._loginService.logOutCurrentUser()
      .then((logoutresponse) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, LoginActions.LOGOUT_OF_FATC_AJAX_TRIO, { logoutresponse });
      })
      .then(() => this._router.navigate(["/"]))
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, LoginActions.LOGOUT_OF_FATC_AJAX_TRIO, error));
  }

  /**
   * Get User"s information to display page case configuration properly
   * This action is caught by the admin.reducer
   * @param none
   */
  getUserInformation(userID: number) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      LoginActions.GET_USER_INFO_LOGIN_AJAX_TRIO);

    this._loginService.getUserConfig(userID)
      .then((userInformation) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, LoginActions.GET_USER_INFO_LOGIN_AJAX_TRIO, {userInformation});
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, LoginActions.GET_USER_INFO_LOGIN_AJAX_TRIO, error));
  }

}
