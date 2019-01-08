

import { HomeComponent } from '../home/home.component';
import { CollectorConfigComponent } from '../collector-configuration/collector-config.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AlertsDirective } from '../../components/alerts/alerts.directive';
import { AlertModule } from 'ngx-bootstrap';
import { AlertsActions } from '../../components/alerts/alerts.actions';
import { Alert } from "../../components/alerts/alert.class";
import { MenuController, ModalController, NavController } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { NgRedux, select } from "@angular-redux/store";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { trigger, style, transition, animate, state, query } from '@angular/animations';
import { LoginActions } from '../../components/login/login.actions';
import { LoginModule } from '../../components/login/login-modal.module';
@Component({
  selector: 'page-hub',
  templateUrl: 'hub.html',
  providers: [
    // LoginModule, LoginActions,
    AlertsActions, AlertModule, AlertsDirective, MenuController]
})
export class HubComponent implements OnInit{

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
  constructor(
    private alertCtrl: AlertController,
    private _alertsActions: AlertsActions,
    private _router: Router,
    // private _LoginActions: LoginActions,
    private navCtrl: NavController,
  ) {
  };

  ngOnInit(){
    // this.presentAlert();
  }

  startNewCollectorsLink() {
    this.navCtrl.push(CollectorConfigComponent);
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

  logoutUser() {
    // this._LoginActions.logoutOfFatCClient();

    this.navCtrl.push(HomeComponent);
    // if(this.navCtrl.canGoBack()){
    //   // this.navCtrl.pop();
    //   this.navCtrl.popToRoot();
    // }
  }

  goHome() {
    // if(this.navCtrl.canGoBack()){
      this.navCtrl.push(HomeComponent)
    // }
    // this._router.navigate(["home"]);
  }
}
