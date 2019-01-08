import { IUserDTO } from "../shared/data.dto";
import { AdminActions } from "./admin.actions";
import { AdminService } from "./admin.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import { LoginActions } from "../login/login.actions";
import { getCookie } from "../shared/cookie-util";
import { EditUserModalComponent } from "./edit-user-modal/edit-user-modal.component";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@Component({
  selector: "app-fat-c-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["../app.component.css", "./admin.component.css"],
  providers: [AdminService],
})

/**
 * Admin component
 * @author Jeff M
 * @description Contains the logic for Admin pages
 * @implements OnInit
 */
export class AdminComponent implements OnInit {

  /**
   * Call the add/edit modal
   * @type {EditUserModalComponent}
   * @memberOf AdminComponent
   */
  @ViewChild(EditUserModalComponent) editUserModal: EditUserModalComponent;

  @select(["usersInfo", "users"]) users$: Observable<IUserDTO[]>;
  @select(["usersInfo", "currentUser"]) displayCurrentUsertype$: Observable<IUserDTO>;

  public subscribe: any;
  public users: IUserDTO[];
  public currentUserID: any;
  public displayCurrentUsertype: IUserDTO;

  constructor(private _loginAction: LoginActions,
    private _adminActions: AdminActions,
    private _loginActions: LoginActions,
    private _router: Router) {
      this.currentUserID = getCookie("UserID");
    this.subscribe = this.users$.subscribe(observer => this.users = observer);
    this.displayCurrentUsertype$.subscribe(value => {
      this.displayCurrentUsertype = value;
    })
  };

  public ngOnInit() {
    this._loginActions.getUserInformation(this.currentUserID);
    this._adminActions.getAllUsers();
    this._adminActions.clearCurrentUser();
  }

  addNewUser(newUserstring: string) {
    this._adminActions.clearCurrentUser();
    this._adminActions.setModal(newUserstring);
    this.editUserModal.ShowAddModal(newUserstring);
  }

  editUserClick(userId: number) {
    this._adminActions.getUser(userId);
    this._adminActions.setModal(userId);
    this.editUserModal.ShowEditModal(userId);
  }

  onBackClick() {
    this._router.navigate(["/cases/"]);
  }
}
