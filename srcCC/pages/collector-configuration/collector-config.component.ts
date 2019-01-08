import { LoginService } from '../../components/login/login.service';
import { HomeComponent } from '../home/home.component';
import { LoginActions } from '../../components/login/login.actions';
import { AnonymousSubject } from 'rxjs/Subject';
import { FormBuilder, Validators } from '@angular/forms';
import { CollectorAuthModal } from '../../components/collector-auth/collector-auth-modal.component';
import { CollectorConfigurationService } from './collector-config.service';
import { CollectorConfigurationActions } from './collector-config.actions';
import { find, propEq, indexOf, join, append, map, keys } from "ramda";
import {
    IAuthorization,
    ICaseDTO,
    ICollectionSummaryItem,
    ICollectorAuthRequest,
    ICollectorConfiguration,
    ICollectorTypes,
    IUserDTO,
} from '../../shared/data.dto';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AlertsDirective } from '../../components/alerts/alerts.directive';
import { AlertModule } from 'ngx-bootstrap';
import { AlertsActions } from '../../components/alerts/alerts.actions';
import { Alert } from "../../components/alerts/alert.class";
import { LoginModal } from '../../components/login/login-modal.component';
import { MenuController, ModalController, NavController, ViewController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { NgRedux, select } from "@angular-redux/store";
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { trigger, style, transition, animate, state, query } from '@angular/animations';

@Component({
  selector: 'page-collecorConfig',
  templateUrl: 'collector-config.html',
  providers: [LoginActions, LoginService ,AlertsActions, AlertModule, AlertsDirective, CollectorConfigurationActions, CollectorConfigurationService]
})
export class CollectorConfigComponent implements OnInit{

  @select(["alerts"]) alerts$: Observable<Alert[]>;
  @select(["collectors", "collectorTypes"]) collectorsTypes$: Observable<ICollectorTypes[]>;
  @select(["collectors", "case", "configurations"]) quedCollectors$: Observable<ICollectorConfiguration[]>;
  @select(["collectors", "newUser"]) newUserCheck$: Observable<string>;
  @select(["collectors", "case"]) caseInfo$: Observable<ICaseDTO>;
  @select(["usersInfo"]) usersInfo$: Observable<any>;

  @ViewChild(CollectorAuthModal) authModal: CollectorAuthModal;

  public collectorAuthForm = this.fb.group({
    collectorType: ["", Validators.required],
    collectorName: ["", Validators.required],
  });

  public caseInfo: ICaseDTO;
  public newUserCheck: string;
  public userInfo: any;

  public caseID: number;
  public defaultCollector: ICollectorConfiguration;
  public currentCase: ICaseDTO;
  public collectors: ICollectorConfiguration[];
  public currentCollector: ICollectorConfiguration;
  public displayCurrentUsertype: IUserDTO;
  public quedCollectors: ICollectorConfiguration[];
  public collectorType: ICollectorTypes[];
  public collectorRun = this.fb.group({
    series: [Validators.required]
  });

    // error alerts
    errorAlerts$: Observable<Alert[]> = Observable.combineLatest(
      this.alerts$,
      (alerts: Alert[]) => alerts.filter((alert: Alert) => alert.type === 3)
    );

    // success alerts
    successAlerts$: Observable<Alert[]> = Observable.combineLatest(
      this.alerts$,
      (alerts: Alert[]) => alerts.filter((alert: Alert) => alert.type === 4)
    );

  constructor(
    // public loginService: LoginService,
    // private actions: LoginActions,
    public fb: FormBuilder,
    private alertCtrl: AlertController,
    private _alertsActions: AlertsActions,
    private _authModal: ModalController,
    private _collectorConfigActions: CollectorConfigurationActions,
    private _router: Router,
    private _LoginActions: LoginActions,
    private navCtrl: NavController,
    private viewCtrl: ViewController
    // private _adminActions: AdminActions
  ) {

    this.caseInfo$.subscribe(value => {
      this.caseInfo = value;
    });

    this.collectorsTypes$.subscribe(value => {
      this.collectorType = value;
    });

    this.newUserCheck$.subscribe(value => {
      this.newUserCheck = value;
    });

    this.usersInfo$.subscribe(value => {
      this.userInfo = value;
    });

    this.quedCollectors$.subscribe(value => {
      this.quedCollectors = value;
    });
  };

  ngOnInit(){
    if (this.newUserCheck === "newUser") {
      const newCaseCreation: ICaseDTO = {
      caseNumber: this.userInfo.userID,
      evidenceNumber: "",
      examinerName: "",
      description: "",
      id: undefined,
      ownerID: undefined
    };

    this._collectorConfigActions.createNewFatCCase(newCaseCreation);
    } else {
    this._collectorConfigActions.getCurrentCase(this.userInfo.userID).then(() => {
console.log("hitting")
      this._collectorConfigActions.getCaseConfigurationByCaseId(1);

    });
    // this._collectorConfigActions.getCaseConfigurationByCaseId(this.caseID);

    // this._collectorConfigActions.createNewFatCCase(newCaseCreation);


  }
  this._collectorConfigActions.getAvailableCollectorTypes();

  }

  logoutUser() {
    this._LoginActions.logoutOfFatCClient();

    this.navCtrl.push(HomeComponent);
  }

  // need to connect alerts to ionic alerts, looks way better.
  // presentAlert() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Low battery',
  //     subTitle: '10% of battery remaining',
  //     buttons: ['Dismiss']
  //   });
  //   alert.present();
  //   setTimeout(()=>alert.dismiss(),3000);
  // }

  onDismissAlert(alertId: string) {
    this._alertsActions.removeAlert(alertId);
  }

  public UpdateAuth(authInfo: IAuthorization) {

    // DH 20170306: dont call save here, call set auth code, so if the collector needs to exchange it to get
    // a live token (common with oauth) we dont just save the one use code
    // fire off a save right now so that collector auth isnt lost if they exit
    this.currentCollector.authInfo = authInfo;
    // DH 20171107: added so backend can map to same collector instance that returned GetAuthURL
    // for oauth1 support
    this.currentCollector.authRequestID = authInfo.authRequestID;
    this.currentCollector.caseID = 1;
    this._collectorConfigActions.createCollectorWithAuth(this.currentCollector)
  }

  public NewCollectorAuthCreate() {
    this.currentCollector = {
      id: 0,
      caseID: this.caseInfo.id,
      indexNumber: 0,
      collectorTypeName: this.collectorAuthForm.value.collectorType,
      collectorAlias: this.collectorAuthForm.value.collectorName,
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
    this._collectorConfigActions.deleteCollector(id);
  }

  /**
   * Show the authenticate modal dialog
   * @memberOf CaseConfigurationComponent
   */
  public AuthenticatePage() {
    const collectorType = find((c: ICollectorTypes) => c.name === this.collectorAuthForm.value.collectorType, this.collectorType);
    if (collectorType) {
      // DH 20171107: auth url now hit on demand every time to support oauth1
      this._collectorConfigActions.getAuthURL(collectorType.name)
        .then((authReq: ICollectorAuthRequest) => {
          const collectorTypeNameAndInfo = {
            collectorType : this.collectorAuthForm.value.collectorType,
            collectorName : this.collectorAuthForm.value.collectorName,
            authURL: authReq.url,
            authRequestID: authReq.requestID,
            isFacebook: this.collectorAuthForm.value.collectorType === "Facebook",
            facebookCollector: find(propEq("name", "Facebook"), this.collectorType)
          }
          const collectorAuthModalEnter = this._authModal.create(CollectorAuthModal, collectorTypeNameAndInfo);
          collectorAuthModalEnter.present();
          collectorAuthModalEnter.onDidDismiss((data) => {
            this.UpdateAuth(data);
          })
          this.saveCurrent().then(() => this.collectorAuthForm.reset({
              collectorName: "", collectorType: ""
            }
          ));
        }).catch(err => {
      });
    }

  }

  private saveCurrent(): Promise<any> {
    // TODO, fix currentCase
    const currentCaseConfig = {
      case: this.currentCase[4],
      configurations: this.collectors
    };

    return this._collectorConfigActions.updateCaseConfiguration(currentCaseConfig);
  }

  public Back() {
    this.saveCurrent();
    this.saveCurrent().then(() =>
      this._collectorConfigActions.clearCaseCollectors())
      .then(() => this._router.navigate(["/cases"]));
  }

  public Next() {
    const runIn: any = {
      series: this.collectorRun.value.series
    };
    this._collectorConfigActions.runCollectorsInOptions(runIn);
    this.saveCurrent();
    this._router.navigate(["/case-run", this.caseID]);
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

  goHome() {
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    }
    this._router.navigate(["home"]);
  }

}
