import { IUserDTO } from '../../shared/data.dto';
import { LoginActions } from './login.actions';
import { LoginService } from './login.service';
import { Component } from '@angular/core';
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

@Component({
  selector: "app-login-modal",
  templateUrl: "./login-modal.html",
  providers: [LoginService, LoginActions, AlertsActions],
})
export class LoginModal {

  public loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  });

  @select(["alerts"]) alerts$: Observable<Alert[]>;
  //create select to check if user is successfully loged in. If so, close modal, THEN nav to hub page.

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
    public _loginActions: LoginActions,
    public _alertsActions: AlertsActions,
    public viewCtrl: ViewController) {

 }

 loginUser(event) {
  const loginInfo: any = {
    UserName: this.loginForm.value.username,
    Password: this.loginForm.value.password
  };
  this._loginActions.loginToFatCClient(loginInfo);
}

onDismissAlert(alertId: string) {
  this._alertsActions.removeAlert(alertId);
}

 dismissModal() {
  this.viewCtrl.dismiss();
}

}
