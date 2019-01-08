import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController, ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";

import { AlertsDirective } from '../../components/alerts/alerts.directive';
import { AlertModule } from 'ngx-bootstrap';
import { AlertsActions } from '../../components/alerts/alerts.actions';
import { Alert } from "../../components/alerts/alert.class";

import { AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { NgRedux, select } from "@angular-redux/store";
import { Router } from "@angular/router";
import {
  IAuthorization,
  ICollectorTypes
} from "../../shared/data.dto";

declare const FB: any;

@Component({
  selector: "app-collector-auth-modal",
  templateUrl: "./collector-auth-modal.html",
  providers: [],
})

export class CollectorAuthModal implements OnInit {
  @select(["alerts"]) alerts$: Observable<Alert[]>;

  public authRequestID: string;
  public authURL: string;
  public isFacebook: boolean;
  public facebookCollector: ICollectorTypes;
  // Stores the auth value
  public authValue: string;
  public targetUsername: string;
  public targetPassword: string;
      // error alerts
      errorAlerts$: Observable<Alert[]> = Observable.combineLatest(
        this.alerts$,
        (alerts: Alert[]) => alerts.filter((alert: Alert) => alert.type === 3)
      );

      // success alerts : Don't think we need this one, but leaving for now just encase.
      successAlerts$: Observable<Alert[]> = Observable.combineLatest(
        this.alerts$,
        (alerts: Alert[]) => alerts.filter((alert: Alert) => alert.type === 4)
      );

 constructor( public params: NavParams,
    public modalController: ModalController,
    public fb: FormBuilder,
    // public _alertsActions: AlertsActions,
    public viewCtrl: ViewController) {

 }

 ngOnInit() {
   this.authRequestID = this.viewCtrl.data.authRequestID;
   this.authURL = this.viewCtrl.data.authURL;
   this.isFacebook = this.viewCtrl.data.isFacebook;
   this.facebookCollector = this.viewCtrl.data.facebookCollector;
 }

CreateCollector() {
  // Pass the auth values up to the parent
  const authInfo = {
    username: this.targetUsername,
    password: this.targetPassword,
    authCode: this.authValue,
    authRequestID: this.authRequestID,
  };
  this.viewCtrl.dismiss(authInfo);
}

Navigate() {
  if (!this.isFacebook) {
    window.open(this.authURL);
  } else {
    // facebook is special snowflake that requires you use their api to open
    // an unexposed URL
    FB.login((result: any) => {
      if (result.authResponse) {
        this.authValue = result.authResponse.accessToken;
      } else {
        alert("didn't receive a valid authorization response from facebook");
      }
    });
  }
}

getAuthTooltip(): string {
  if (!this.targetUsername || !this.targetPassword) {
    return "Enter target username and password for storage before authenticating";
  }
  if (!this.authValue) {
    return "Enter received authentication code from 3rd party website login before saving authentication";
  }
  return "";
}

isAuthButtonDisabled() {
  return !this.targetPassword || !this.targetUsername || !this.authValue;
}

 dismissModal() {
  this.viewCtrl.dismiss();
}

}
