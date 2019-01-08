import { FormBuilder, Validators } from "@angular/forms";
import { LoginActions } from "../login/login.actions";
import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { select } from "@angular-redux/store";
import { find, propEq, indexOf, join, append, map, keys } from "ramda";
import { CaseConfigurationActions } from "./case-configuration.actions";
import { CaseConfigurationService } from "./case-configuration.service";
import {
  IAuthorization,
  ICaseDTO,
  ICollectionSummaryItem,
  ICollectorConfiguration,
  ICollectorTypes,
  IUserDTO,
  defaultCollector, ICollectorAuthRequest
} from "../shared/data.dto";
import { AuthenticateModalComponent } from "../shared/authenticate-modal/authenticate-modal.component";
import { CurrentCaseActions } from "../shared/current-case/current-case.actions";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@Component({
  selector: "app-case-configuration",
  templateUrl: "./case-configuration.component.html",
  styleUrls: ["case-configuration.component.scss", "../app.component.css"],
  providers: [CaseConfigurationService, CaseConfigurationActions]
})
/**
 * CaseConfigurationComponent stores the case configuration logic
 * @author Shaun Shepherd (sshepherd@ara.com)
 * @description Handle logic for case config page
 * @implements OnInit, OnDestroy
 */
export class CaseConfigurationComponent implements OnInit, OnDestroy {
  /**
   * Pull the state variables and set to observables
   */
  @select(["casesInfo", "currentCase", "case"]) currentCase$: Observable<ICaseDTO>;
  @select(["casesInfo", "currentCase", "configurations"]) collectors$: Observable<ICollectorConfiguration[]>;
  @select(["casesInfo", "collectorTypes"]) collectorTypes$: Observable<ICollectorTypes[]>;
  @select(["usersInfo", "currentUser"]) displayCurrentUsertype$: Observable<IUserDTO>;


  /**
   * Call the Authenticate modal
   *
   * @type {AuthenticateModalComponent}
   * @memberOf CaseConfigurationComponent
   */
  @ViewChild(AuthenticateModalComponent) authModal: AuthenticateModalComponent;

  /**
   * Case ID taken from the route parameter
   *
   * @type {number}
   * @memberOf CaseConfigurationComponent
   */
  public caseID: number;
  public defaultCollector: ICollectorConfiguration;
  public currentCase: ICaseDTO;
  public collectors: ICollectorConfiguration[];
  public collectorTypes: ICollectorTypes[];
  public currentCollector: ICollectorConfiguration;
  public displayCurrentUsertype: IUserDTO;
  public collectorRun = this.fb.group({
    series: [Validators.required]
  });

  public NewCollector = this.fb.group({
    collectorName: ["", Validators.required],
    collectorType: ["", Validators.required],
  });

  /**
   * Creates an instance of CaseConfigurationComponent.
   * Grabs the case id from the URL parameter.
   * Subscribes to each observable for the page.
   *
   * @param {ActivatedRoute} route - for routing purposes
   * @param {CasesActions} _caseActions - to call actions on the component
   *
   * @memberOf CaseConfigurationComponent
   */
  constructor(private route: ActivatedRoute,
              private _router: Router,
              public fb: FormBuilder,
              private _loginActions: LoginActions,
              private _caseConfigActions: CaseConfigurationActions,
              private _currentCaseActions: CurrentCaseActions) {

    this.route.params.subscribe(params => {
      this.caseID = +params["caseID"];
    });
    this._currentCaseActions.getCurrentCase(this.caseID);
    this.displayCurrentUsertype$.subscribe(value => {
      this.displayCurrentUsertype = value;
    });
    this.currentCase$.subscribe(value => {
      this.currentCase = value;
    });

    this.collectorTypes$.subscribe(value => {
      this.collectorTypes = value;
    });
    this.collectors$.subscribe(value => {
      this.collectors = value;
    });
  }

  /**
   * Initialize the component
   *
   * @memberOf CaseConfigurationComponent
   */
  public ngOnInit() {
    this._caseConfigActions.getAvailableCollectorTypes();

    this._currentCaseActions.getCaseConfigurationByCaseId(this.caseID);
  }

  public ngOnDestroy() {
    this.saveCurrent();
  }

  /**
   * Update the authenticated code from the child modal
   *
   * @param {IAuthorization} authInfo
   *
   * @memberOf CaseConfigurationComponent
   */
  public UpdateAuth(authInfo: IAuthorization) {
    // DH 20170306: dont call save here, call set auth code, so if the collector needs to exchange it to get
    // a live token (common with oauth) we dont just save the one use code
    // fire off a save right now so that collector auth isnt lost if they exit
    this.currentCollector.authInfo = authInfo;
    // DH 20171107: added so backend can map to same collector instance that returned GetAuthURL
    // for oauth1 support
    this.currentCollector.authRequestID = authInfo.authRequestID;
    this._caseConfigActions.createCollectorWithAuth(this.currentCollector)
  }

  public NewCollectorAuthCreate() {
    this.currentCollector = {
      id: 0,
      caseID: this.caseID,
      indexNumber: 0,
      collectorTypeName: this.NewCollector.value.collectorType,
      collectorAlias: this.NewCollector.value.collectorName,
      hasAuthorization: false,
      authInfo: null,
      authRequestID: "",
      desiredChunkSize: 512,
      summary: null,
    };
    this.AuthenticatePage()
  }

  /**
   * Delete current selected collector
   * @memberOf CaseConfigurationComponent
   */
  public deleteCollector(event, id: number) {
    if (window.confirm("Are you sure you want to delete this collector?")) {
      this._caseConfigActions.deleteCollector(id);

    }
  }

  /**
   * Show the authenticate modal dialog
   * @memberOf CaseConfigurationComponent
   */
  public AuthenticatePage() {
    const collectorType = find((c: ICollectorTypes) => c.name === this.NewCollector.value.collectorType, this.collectorTypes);
    if (collectorType) {
      // DH 20171107: auth url now hit on demand every time to support oauth1
      this._caseConfigActions.getAuthURL(collectorType.name)
        .then((authReq: ICollectorAuthRequest) => {
          this.authModal.authURL = authReq.url;
          this.authModal.authRequestID = authReq.requestID;
          this.authModal.isFacebook = this.NewCollector.value.collectorType === "Facebook";
          this.authModal.facebookCollector = find(propEq("name", "Facebook"), this.collectorTypes);
          this.authModal.ShowAuthModal();
          this.saveCurrent().then(() => this.NewCollector.reset({
              collectorName: "", collectorType: ""
            }
          ));
        }).catch(err => {
      });
    }
  }

  /**
   * Check to see if we have any collectors in the case study
   * @returns {boolean}
   */
  public haveCollectors(): boolean {

    if (this.collectors === null || this.collectors === undefined) {
      return false;
    }
    if (this.collectors.length > 0 ) {
      return true;
    }
    return false;
  }
  private saveCurrent(): Promise<any> {
    const currentCaseConfig = {
      case: this.currentCase,
      configurations: this.collectors
    };

    return this._caseConfigActions.updateCaseConfiguration(currentCaseConfig);
  }

  public Back() {
    this.saveCurrent();
    this.saveCurrent().then(() =>
      this._caseConfigActions.clearCaseCollectors())
      .then(() => this._router.navigate(["/cases"]));
  }

  public Next() {
    const runIn: any = {
      series: this.collectorRun.value.series
    };
    this._caseConfigActions.runCollectorsInOptions(runIn);
    this.saveCurrent();
    if (this.collectors.length > 0) {
      this._router.navigate(["/case-run", this.caseID]);
    }
  }

  public getAuthTooltip(): string {
    if (!this.haveCollectors()) {
      return "Please add a collector to advance.";
    }
    return "";
  }

  /**
   * GetSummaryItems handles looping through the estimate of metadata we get to show how big a collection may be
   * Not every collector will be the same data so this enables us to be flexable
   *
   * @param {summary} ICollectionSummary - for routing purposes
   *
   * @memberOf CaseConfigurationComponent
   */

  public GetSummaryItems(summary: { [itemName: string]: string; }): ICollectionSummaryItem[] {
    if (!summary) {
      return [{ name: "Loading...", value: "" }];
    }
    return map(k => ({ name: k, value: summary[k] }), keys(summary));
  }

  public goToCaseHistory() {
    this._router.navigate(["/case-history/", this.caseID]);
  }
}
