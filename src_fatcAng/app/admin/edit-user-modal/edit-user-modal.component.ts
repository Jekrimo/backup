import { UserAuthModalComponent } from "../user-auth-modal/user-auth-modal.component";
import { AdminActions } from "../admin.actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUserDTO } from "../../shared/data.dto";
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import { Component, ViewChild, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { IAppState } from "../../store";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@Component({
  selector: "app-admin-modal",
  templateUrl: "./edit-user-modal.component.html",
  styleUrls: ["./edit-user-modal.component.scss", "../../app.component.css"]
})

/**
 * edit User modal component
 * @author Jeff M
 * @description Contains the logic for the user modal
 * @memberOf FatCAdminComponent
 */

export class EditUserModalComponent {

  @ViewChild("adminModal") public adminModal: ModalDirective;
  @ViewChild("UserAuthModalComponent") public authModal: UserAuthModalComponent;

  @select(["usersInfo", "users"]) users$: Observable<any>;
  @select(["usersInfo", "editUser"]) EditUserId$: Observable<IUserDTO>;
  @select(["usersInfo", "modalStatus"]) modalStatus$: Observable<null>;

  public addEditUser: IUserDTO;

// typeofModal will handle if the modal will be editing an exsisting user or creating a new one.
  public typeofModal: any;
  public modalStatus;
  public passwordMatchLock = true;

  public UserInfo = this.fb.group({
    id: ["", Validators.required],
    email: ["", Validators.required],
    changepassword: ["", Validators.required],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    authcode: ["", Validators.required],
    userName: ["", Validators.required],
    userConfig: ["", Validators.required],
    userType: ["", Validators.required]
  });

  public passcheck = this.fb.group({
    password: ["", Validators.required],
    checkPassword: ["", Validators.required]
  });

  constructor(public _state: NgRedux<IAppState>,
    public fb: FormBuilder,
    public _adminActions: AdminActions, ) {
    this.EditUserId$.subscribe(value => {
      this.addEditUser = value;
      this.addEditUser.pwUserInput = "";
    });

    this.modalStatus$.subscribe(value => {
      this.modalStatus = value;
    });

  };
  /**
   * Show the edit user modal
   *@param userId - Number
   * @memberOf EditUserModalComponent
   */
  public ShowEditModal(userId) {
    this.typeofModal = userId;
    this._adminActions.getUser(userId);
    this.adminModal.show();

  }

  /**
   * Show the add user modal
   *@param message - string
   * @memberOf EditUserModalComponent
   */
  public ShowAddModal(message: string) {
    this.typeofModal = message;
    this.adminModal.show();
  }

  /**
   * Hide the edit/add user modal
   *
   * @memberOf EditUserModalComponent
   */
  public HideEditModal() {
    this._adminActions.clearCurrentUser();
    this.adminModal.hide();
  }

 /**
   * Show the add user modal
   *@param userID - number
   * @memberOf EditUserModalComponent
   */
  public deleteUser(userId: any) {
    this._adminActions.deleteUser(userId);
    this._adminActions.clearCurrentUser();
    this.adminModal.hide();
  }

/**
   * Create and add a new user to Fat-C
   * creates a new user for fat-c, fills in an empty user object and sends to service to fill in any missing info,
   * i.e. id, passwordHash, authcode
   *@param userInfo - IUserDTO
   * @memberOf EditUserModalComponent
   */
  public addUserConfig(userInfo: IUserDTO) {
    let userConfigEmptyCatch: string;
    if (this.UserInfo.value.userConfig === undefined) {
      userConfigEmptyCatch = "Law Enforcement";
    } else {
      userConfigEmptyCatch = this.UserInfo.value.userConfig;
    }
    const userInfoForm: IUserDTO = {
      id: parseInt(this.UserInfo.value.id, this.UserInfo.value.id),
      email: this.UserInfo.value.email,
      firstName: this.UserInfo.value.firstName,
      lastName: this.UserInfo.value.lastName,
      passwordHash: "",
      tempPass: this.passcheck.value.password,
      authCode: "",
      pwUserInput: "",
      userName: this.UserInfo.value.userName,
      configuration: userConfigEmptyCatch,
      isAdmin: this.UserInfo.value.userType,
    };
    this._adminActions.addNewUser(userInfoForm);
    this._adminActions.getUser(userInfoForm.id);
    this.HideEditModal();
    this.authModal.ShowAuthModal();

  }

  /**
   *  save edit/add user modal
   * @param userInformation type IUserDTO
   * @memberOf EditUserModalComponent
   */

  public saveUserConfig(userInformation: IUserDTO) {

    if (this.typeofModal !== "newUser") {

      const editUserForm: IUserDTO = {
        id: this.addEditUser.id,
        email: this.UserInfo.value.email,
        passwordHash: this.addEditUser.passwordHash,
        firstName: this.UserInfo.value.firstName,
        lastName: this.UserInfo.value.lastName,
        tempPass: "",
        pwUserInput: "",
        authCode: this.addEditUser.authCode,
        userName: this.UserInfo.value.userName,
        configuration: this.UserInfo.value.userConfig,
        isAdmin: this.UserInfo.value.userType,
      };
      this._adminActions.updateUser(editUserForm);
      if (this.UserInfo.value.changepassword !== "" && this.UserInfo.value.changepassword !== undefined) {
        const userNameAndPasswordUpdate: Object = {
          username: this.addEditUser.userName,
          newPassword: this.UserInfo.value.changepassword
        };
        this._adminActions.updateUsersPassword(userNameAndPasswordUpdate);
      }
      this.HideEditModal();
    }
  }

}
