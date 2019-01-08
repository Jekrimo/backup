import { CaseConfigurationActions } from "../case-configuration/case-configuration.actions";
import { AdminActions } from "../admin/admin.actions";
import { NgRedux, select } from "@angular-redux/store";
import { LoginActions } from "../login/login.actions";
import { CasesActions } from "./cases.actions";
import { Component, OnInit, OnDestroy } from "@angular/core";

import { Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { IAppState } from "../store";

import { CasesManagerService } from "./cases.service";
import { ICaseDTO, IUserDTO } from "../shared/data.dto";
import { ILoginState } from "../login/login.models";
import { getCookie } from "../shared/cookie-util";
import { CurrentCaseActions } from "../shared/current-case/current-case.actions";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
/**
 * This component handles the creation and loading
 * of FATC cases for the user
 */
@Component({
  selector: "app-add-cases",
  templateUrl: "./cases.component.html",
  styleUrls: ["../app.component.css"],
  providers: [CasesManagerService],
})
export class CasesComponent implements OnInit, OnDestroy {

  /**
   * This observable stores all cases from the state
   * @type {Observable<ICaseDTO[]>}
   * @memberOf CasesComponent
   */
  @select(["casesInfo", "cases"]) allExistingCases$: Observable<ICaseDTO[]>;

  /**
   * This observable checks to see if logged in user is admin to display admin button
   * @type {Observable<ICaseDTO[]>}
   * @memberOf CasesComponent
   */
  @select(["login", "isAdmin"]) isAdmin$: Observable<boolean>;
  @select(["login"]) currentUserInfo$: Observable<ILoginState>;
  @select(["usersInfo", "currentUser"]) displayCurrentUsertype$: Observable<IUserDTO>;

  public subscribe: any;
  public allExistingCases: ICaseDTO[];
  public currentUserID: any;
  public createCaseButton = true;

  public addNewCase = this.fb.group({
    newCaseName: ["", Validators.required],
  });
  public isAdmin: boolean;
  public cookieSessionID: string;
  public currentUserInfo: ILoginState;
  public displayCurrentUsertype: IUserDTO;

  /**
   * Creates an instance of FatCCasesComponent.
   *
   * @param {CasesManagerService} casesService
   * @param {FatCActions} _fatCAction
   * @param {AppActions} _appAction
   * @param {CasesActions} _caseactions
   * @param {FormBuilder} fb
   * @param {Router} _router
   * @param {NgRedux<IAppState>} state
   *
   * @memberOf FatCCasesComponent
   */
  constructor(private _loginActions: LoginActions,
              private _caseactions: CasesActions,
              private _adminActions: AdminActions,
              private _router: Router,
              private fb: FormBuilder,
              private _configActions: CaseConfigurationActions,
              private _currentCaseActions: CurrentCaseActions) {

    this.cookieSessionID = getCookie("login");
    this.currentUserID = getCookie("UserID");
    this._configActions.clearCaseCollectors();
    this._caseactions.getUserCases();
    this.subscribe = this.allExistingCases$.subscribe(observer => this.allExistingCases = observer);
    this.isAdmin$.subscribe(value => this.isAdmin = value);
    this.currentUserInfo$.subscribe(value => this.currentUserInfo = value);
    this.displayCurrentUsertype$.subscribe(value => {
      this.displayCurrentUsertype = value;
    })
  };

  /**
   * Init lifecycle hook
   *
   * @memberOf CasesComponent
   */
  public ngOnInit() {
    if (this.cookieSessionID !== "" && !this.currentUserInfo.sessionID) {
      this._loginActions.getCookieSession(this.cookieSessionID);
    }
    this._configActions.clearCaseCollectors();
    if (this.isAdmin === true) {
      this._adminActions.getUser(this.currentUserInfo.userID);
    } else {
      this._loginActions.getUserInformation(this.currentUserID);
    }
    if (!this.currentUserInfo$) {
      this._loginActions.getUserInformation(this.currentUserID);
    }
  }

  /**
   * Destroy lifecycle hook
   * Unsubscribe to the observables
   * @memberOf CasesComponent
   */
  public ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  /**
   * Open existing case handler
   * @param {number} existingCaseNumber
   * @memberOf CasesComponent
   */
  openExistingCase(existingCaseNumber: number) {
    this._currentCaseActions.getCaseConfigurationByCaseId(existingCaseNumber);
    this._router.navigate(["/case-configuration/", existingCaseNumber]);
  }

  disabledBtn() {
    if (this.addNewCase.value.newCaseName === "") {
     return true;
    } else {
      return false;
    }
  }

  /**
   * Add a case action handler
   * @param {any} event
   * @memberOf CasesComponent
   */
  addCase(event) {
    if (this.addNewCase.value.newCaseName === "") {
      this.createCaseButton = true;
    } else {
      this.createCaseButton = false;
    const newCaseCreation: ICaseDTO = {
      caseNumber: this.addNewCase.value.newCaseName,
      evidenceNumber: "",
      examinerName: "",
      description: "",
      id: undefined,
      ownerID: undefined
    };
    this._caseactions.createNewFatCCase(newCaseCreation);
    }
  }

  adminLink(event) {
    this._adminActions.getAllUsers();
  }
}
