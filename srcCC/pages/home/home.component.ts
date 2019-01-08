import { SignUpComponent } from '../sign-up/sign-up.component';
import { AlertsDirective } from '../../components/alerts/alerts.directive';
import { AlertModule } from 'ngx-bootstrap';
import { AlertsActions } from '../../components/alerts/alerts.actions';
import { Alert } from "../../components/alerts/alert.class";
import { LoginModal } from '../../components/login/login-modal.component';
import { MenuController, ModalController, NavController, ViewController } from 'ionic-angular';
import { HomeService } from './home.service';

import { AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { NgRedux, select } from "@angular-redux/store";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { trigger, style, transition, animate, state, query } from '@angular/animations';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('myAwesomeAnimation', [
      transition(':enter', [
        query(':enter', [], {optional: true})]),
      state('small', style({transform: 'translateY(50%)'})),
      state('large', style({transform: 'translateY(0%)'})),
      transition('small => large', animate(400, style({transform: 'translateY(0%)'}))),
  ]),
  trigger('modalStateOpacity', [
    transition(':enter', [
      query(':enter', [], {optional: true}),
    ]),
    state('small',  style({ opacity: '0' })),
    state('large', style({ opacity: '1' })),
    transition('small => large', animate(400, style({opacity: '1'})))
  ]),
  ],
  providers: [AlertsActions, AlertModule, AlertsDirective, MenuController]
})
export class HomeComponent implements OnInit{

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
  public rootPage:any = HomeComponent
  public state: string = 'small';
  constructor(
    private alertCtrl: AlertController,
    private _alertsActions: AlertsActions,
    private _loginModal: ModalController,
    private _router: Router,
    private navCtrl: NavController,
    public viewCtrl: ViewController
  ) {
  };

  ngOnInit(){

    this.state = (this.state === 'small' ? 'large' : 'small');
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
  animateMe() {
            this.state = (this.state === 'small' ? 'large' : 'small');
      }
  triggerAnimation(){}

  loginUserModal() {
    const loginModalEnter = this._loginModal.create(LoginModal, {something: 'something'});
    loginModalEnter.present();
  }

  signUpLink() {
    this.navCtrl.push(SignUpComponent)
  }

}
