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
  selector: "app-user-auth-modal",
  templateUrl: "./user-auth-modal.component.html",
  styleUrls: ["./user-auth-modal.component.scss", "../../app.component.css"]
})

/**
 * edit User modal component
 * @author Jeff M
 * @description Contains the logic for the user modal
 * @memberOf FatCAdminComponent
 */

export class UserAuthModalComponent {

  @ViewChild("authModal") public authModal: ModalDirective;

  @select(["usersInfo", "users"]) users$: Observable<any>;

  @select(["usersInfo", "modalStatus"]) modalStatus$: Observable<null>;

  @select(["usersInfo", "editUser"]) EditUserId$: Observable<IUserDTO>;

  public currentUser: IUserDTO;
  public addEditUser: IUserDTO;
  public typeofModal: any;
  public modalStatus;
  public passwordMatchLock = true;

  constructor(public _state: NgRedux<IAppState>,
    public fb: FormBuilder,
    public _adminActions: AdminActions, ) {
    this.EditUserId$.subscribe(value => {
      this.addEditUser = value;
    });
    this.modalStatus$.subscribe(value => {
      this.modalStatus = value;
    });

  };

  /**
   * Show the auth modal
   *
   * @memberOf UserAuthModalComponent
   */
  public ShowAuthModal() {
    this.authModal.show();

  }

  public HideAuthModal() {
    this.authModal.hide();
  }

  public Navigate() {
    // window.open(this.authURL);
  }

}
