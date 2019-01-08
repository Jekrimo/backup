import { LoginActions } from '../components/login/login.actions';
import { CollectorAuthModal } from '../components/collector-auth/collector-auth-modal.component';
import { CollectorAuthModule } from '../components/collector-auth/collector-auth-modal.module';
import { CollectorConfigComponent } from '../pages/collector-configuration/collector-config.component';
import { CollectorConfigModule } from '../pages/collector-configuration/collector-config.module';
import { HubComponent } from '../pages/hub/hub.component';
import { HubModule } from '../pages/hub/hub.module';
import { SignUpComponent } from '../pages/sign-up/sign-up.component';
import { SignUpModule } from '../pages/sign-up/sign-up.module';
import { AlertsDirective } from '../components/alerts/alerts.directive';
import { LoginModal } from '../components/login/login-modal.component';
import { LoginModule } from '../components/login/login-modal.module';
import { HomeModule } from '../pages/home/home.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule, NgRedux, DevToolsExtension } from "@angular-redux/store";
import { createLogger } from "redux-logger";
import { IAppState, rootReducer } from "../state/store";
import { environment } from "../environments/environment";
import { AlertModule } from "ngx-bootstrap";

import { MyApp } from './app.component';
import { HomeComponent } from '../pages/home/home.component';

@NgModule({
  declarations: [
    MyApp,
    AlertsDirective,
  ],
  imports: [
    BrowserModule,
    SignUpModule,
    AlertModule.forRoot(),
    NgReduxModule,
    HomeModule,
    HubModule,
    CollectorConfigModule,
    LoginModule,
    CollectorAuthModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      {
        path: "index.html",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "#",
        redirectTo: "home",
        pathMatch: "full"
      },
    ], { useHash: true }),
    RouterModule.forChild([
      { path: "sign-up", component: SignUpComponent },
      // { path: "auth-page", component: AuthComponent, canActivate: [AuthGuard] },
      // { path: "cases", component: CasesComponent, canActivate: [AuthGuard] },
      // { path: "user", component: UserComponent, canActivate: [AuthGuard] },
      // { path: "case-configuration/:caseID", component: CaseConfigurationComponent, canActivate: [AuthGuard] },
      // { path: "case-run/:caseID", component: CaseRunComponent, canActivate: [AuthGuard] },
      // { path: "case-history/:caseID", component: CaseHistoryComponent, canActivate: [AuthGuard] },
    ]),
  ],
  bootstrap: [IonicApp, MyApp],
  entryComponents: [
    MyApp,
    LoginModal,
    HubComponent,
    CollectorConfigComponent,
    CollectorAuthModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AlertModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [RouterModule]
})
export class AppModule {
  constructor(private _ngRedux: NgRedux<IAppState>, private _devTool: DevToolsExtension) {
    // create redux store with logging and dev tools enabled
    _ngRedux.configureStore(
      rootReducer,
      {},
      environment.production ? [] : [createLogger()],
      [environment.production && _devTool.isEnabled() ? _devTool.enhancer() : f => f]
    );
  }
}
