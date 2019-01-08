import { IUserDTO } from "../shared/data.dto";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AjaxTrio } from "../shared/ajaxTrio.class";
import { IAppState } from "../store";

///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////

@Injectable()
export class UserActions {

  static UPDATE_USERS_SELF_AJAX_TRIO = new AjaxTrio(
    "UPDATE_USERS_SELF_AJAX_TRIO",
    "pending updating user...",
    "Successfull updated user for fat-c!",
    "Failed to update user for fat-c."
  );

  static UPDATE_USER_SELF_PASSWORD_AJAX_TRIO = new AjaxTrio(
    "UPDATE_USER_SELF_PASSWORD_AJAX_TRIO",
    "pending updating user password...",
    "Successfull updated password for fat-c!",
    "Failed to update password for fat-c."
  );

  constructor(private _ngRedux: NgRedux<IAppState>,
    private _userService: UserService,
    private _router: Router) {
  }

  /**
   * Update user
   * upon success will update user
   * @param UserInfo - IUserDTO
   */

  updateUser(updateUserInfo: IUserDTO) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      UserActions.UPDATE_USERS_SELF_AJAX_TRIO);

    this._userService.updateUserInformation(updateUserInfo)
      .then(() =>
        AjaxTrio.dispatchSuccessAction(this._ngRedux, UserActions.UPDATE_USERS_SELF_AJAX_TRIO, { updateUserInfo }))
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, UserActions.UPDATE_USERS_SELF_AJAX_TRIO, error));
  }

  /**
   * Update user
   * upon success will update user
   * @param UserInfo - IUserDTO
   */

  updateUsersPassword(UserNameAndPassword: Object) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      UserActions.UPDATE_USER_SELF_PASSWORD_AJAX_TRIO);

    this._userService.changeUserPassword(UserNameAndPassword)
      .then(() =>
        AjaxTrio.dispatchSuccessAction(this._ngRedux, UserActions.UPDATE_USER_SELF_PASSWORD_AJAX_TRIO, { UserNameAndPassword }))
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, UserActions.UPDATE_USER_SELF_PASSWORD_AJAX_TRIO, error));
  }

}
