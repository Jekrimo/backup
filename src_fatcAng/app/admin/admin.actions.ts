import { IUserDTO } from "../shared/data.dto";
import { AdminService } from "./admin.service";
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
export class AdminActions {

  static GET_ALL_USERS_AJAX_TRIO = new AjaxTrio(
    "GET_ALL_USERS_AJAX_TRIO",
    "Attempting to get all users...",
    "Successfully got all users!",
    "failed  to get all users!"
  );

  static GET_USER_AJAX_TRIO = new AjaxTrio(
    "GET_USER_AJAX_TRIO",
    "Attempting to get user Info...",
    "Successfully got user Info!",
    "failed to get user info!"
  );

  static ADD_NEW_USER_AJAX_TRIO = new AjaxTrio(
    "ADD_NEW_USER_AJAX_TRIO",
    "pending adding a new user...",
    "Successfull added a new user for fat-c!!",
    "Failed to successfully add a new user for fat-c."
  );

  static UPDATE_USER_AJAX_TRIO = new AjaxTrio(
    "UPDATE_USER_AJAX_TRIO",
    "pending updating a user...",
    "Successfull updated a user for fat-c!",
    "Failed to update a user for fat-c."
  );

  static UPDATE_USER_PASSWORD_AJAX_TRIO = new AjaxTrio(
    "UPDATE_USER_PASSWORD_AJAX_TRIO",
    "pending updating a user password...",
    "Successfull updated a users password for fat-c!",
    "Failed to update a user password for fat-c."
  );

  static DELETE_USER_AJAX_TRIO = new AjaxTrio(
    "DELETE_USER_AJAX_TRIO",
    "Attempting delete fatc user...",
    "Successfully deleted fatc user!",
    "failed to delete fatc user!"
  );

  static MODAL_STATUS_AJAX_TRIO = "MODAL_STATUS_AJAX_TRIO"

  static CLEAR_USER_AJAX_TRIO = "CLEAR_USER_AJAX_TRIO";

  constructor(private _ngRedux: NgRedux<IAppState>,
    private _adminService: AdminService,
    private _router: Router) {
  }

  /**
   * get all users
   * @param none
   */

  getAllUsers() {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      AdminActions.GET_ALL_USERS_AJAX_TRIO);

    this._adminService.getAllCurrentUsers()
      .then((getUserResponse) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, AdminActions.GET_ALL_USERS_AJAX_TRIO, { getUserResponse });
      }).then(() => this._router.navigate(["/admin-page"]))
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, AdminActions.GET_ALL_USERS_AJAX_TRIO, error));
  }

  /**
   * Get single user
   * @param UserId
   */

  getUser(userId: number) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      AdminActions.GET_USER_AJAX_TRIO);

    this._adminService.getUser(userId)
      .then((edituserInformation) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, AdminActions.GET_USER_AJAX_TRIO, { edituserInformation });
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, AdminActions.GET_USER_AJAX_TRIO, error));
  }

/**
   * Used to display new or edit modal
   * @param message - will be a newUser string or userID
   */
  setModal(message: any): void {
    this._ngRedux.dispatch({
      type: AdminActions.MODAL_STATUS_AJAX_TRIO,
      payload: {message}
    })
  }

  /**
   * Create new user
   * upon success will create user and add them to fat c user table accessed for admins
   * @param UserInfo - IUserDTO of user id and name
   */

  addNewUser(UserInfo: IUserDTO) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      AdminActions.ADD_NEW_USER_AJAX_TRIO);

    this._adminService.createNewUser(UserInfo)
      .then((newUserInfo): any => {
        this.getUser(newUserInfo.id);
        AjaxTrio.dispatchSuccessAction(this._ngRedux, AdminActions.ADD_NEW_USER_AJAX_TRIO, { newUserInfo });
        this.clearCurrentUser();
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, AdminActions.ADD_NEW_USER_AJAX_TRIO, error));
  }

  /**
   * Update user
   * upon success will update user
   * @param UserInfo - IUserDTO
   */

  updateUser(UserInfo: IUserDTO) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      AdminActions.UPDATE_USER_AJAX_TRIO);

    this._adminService.updateUser(UserInfo)
      .then(() =>
        AjaxTrio.dispatchSuccessAction(this._ngRedux, AdminActions.UPDATE_USER_AJAX_TRIO, { UserInfo }))
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, AdminActions.UPDATE_USER_AJAX_TRIO, error));
  }

  /**
   * Update user password
   * upon success will update user password
   * @param {UserNameAndPassword}
   */

  updateUsersPassword(UserNameAndPassword: Object) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      AdminActions.UPDATE_USER_PASSWORD_AJAX_TRIO);

    this._adminService.changeUserPassword(UserNameAndPassword)
      .then(() =>
        AjaxTrio.dispatchSuccessAction(this._ngRedux, AdminActions.UPDATE_USER_PASSWORD_AJAX_TRIO, { UserNameAndPassword }))
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, AdminActions.UPDATE_USER_PASSWORD_AJAX_TRIO, error));
  }

  /**
   * Clear current user from state
   * upon success will clear user so that info doesn't stick and cause save errors
   * @param none
   */

  clearCurrentUser(): void {
    this._ngRedux.dispatch({
      type: AdminActions.CLEAR_USER_AJAX_TRIO,
      payload: {}
    })
  }

  /**
   * delete user
   * upon success will Delete user
   * @param userId: number
   */

  deleteUser(userId: number) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      AdminActions.DELETE_USER_AJAX_TRIO);

    this._adminService.deleteUser(userId)
      .then((deletedUser) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, AdminActions.DELETE_USER_AJAX_TRIO, { userId });
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, AdminActions.DELETE_USER_AJAX_TRIO, error));
  }

}
