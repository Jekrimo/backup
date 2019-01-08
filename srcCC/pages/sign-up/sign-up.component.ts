import { FormBuilder, Validators } from '@angular/forms';
import { ISignUpForm } from '../../shared/data.dto';

import { AlertsDirective } from '../../components/alerts/alerts.directive';
import { AlertModule } from 'ngx-bootstrap';
import { AlertsActions } from '../../components/alerts/alerts.actions';
import { Alert } from "../../components/alerts/alert.class";
import { LoginModal } from '../../components/login/login-modal.component';
import { ModalController, NavController, AlertController } from 'ionic-angular';

import { Observable } from "rxjs/Observable";
import { NgRedux, select } from "@angular-redux/store";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


import { trigger, style, transition, animate, state, query } from '@angular/animations';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  providers: [AlertsActions]
})
export class SignUpComponent implements OnInit{

  @select(["alerts"]) alerts$: Observable<Alert[]>;

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

    public SignUpForm = this.fb.group({
      fullName: ["", Validators.required],
      organization: ["", Validators.required],
      badgeIdNumber: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required],
    });
  constructor(
    // public loginService: LoginService,
    // private actions: LoginActions,
    public fb: FormBuilder,
    private alertCtrl: AlertController,
    private _alertsActions: AlertsActions,
    private _loginModal: ModalController,
    private _router: Router,
    private navCtrl: NavController
    // private _adminActions: AdminActions
  ) {
  };

  ngOnInit(){
    // this.presentAlert();
  }

  // need to connect alerts to ionic alerts, looks way better.
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
    setTimeout(()=>alert.dismiss(),3000);
  }

  onDismissAlert(alertId: string) {
    this._alertsActions.removeAlert(alertId);
  }

  signUpSubmit() {
    const SignUpFormSubmit: ISignUpForm = {
      fullName: this.SignUpForm.value.fullName,
      organization: this.SignUpForm.value.organization,
      badgeIdNumber: this.SignUpForm.value.badgeIdNumber,
      phoneNumber: this.SignUpForm.value.phoneNumber,
      address: this.SignUpForm.value.address
    }
    console.log(SignUpFormSubmit);
  }
  loginUserModal() {
    const loginModalEnter = this._loginModal.create(LoginModal, {something: 'something'});
    loginModalEnter.present();
  }

  goHome() {
    if(this.navCtrl.canGoBack()){
    this.navCtrl.pop();
  }
  }
}
