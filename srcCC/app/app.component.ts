import { MenuController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { Alert } from "../components/alerts/alert.class";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/combineLatest';
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "../state/store";


import { HomeComponent } from '../pages/home/home.component';
@Component({
  templateUrl: 'app.html',
  providers: [MenuController]
})
export class MyApp implements OnInit{
  rootPage:any = HomeComponent;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,

    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  // onDismissAlert(alertId: string) {
  //   this._alertAction.removeAlert(alertId);
  // }
  ngOnInit() {
    // this._alertAction.createAlert("1", 4, "work");
  }
}

