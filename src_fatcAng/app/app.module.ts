import { CurrentCaseService } from "./shared/current-case/current-case.service";
import { AuthenticateModalModule } from "./shared/authenticate-modal/authenticate-modal.module";
import { BannerModule } from "./shared/banner/banner.module";
import { UserService } from "./user/user.service";
import { UserActions } from "./user/user.actions";
import { UserModule } from "./user/user.module";
import { CaseConfigurationActions } from "./case-configuration/case-configuration.actions";
import { CaseConfigurationService } from "./case-configuration/case-configuration.service";
import { AdminService } from "./admin/admin.service";
import { AdminModule } from "./admin/admin.module";
import { CommonModule } from "@angular/common";
import { AlertsDirective } from "./alerts/alerts.directive";
import { AlertsActions } from "./alerts/alerts.actions";
import { CasesManagerService } from "./cases/cases.service";
import { CasesActions } from "./cases/cases.actions";
import { AdminActions } from "./admin/admin.actions";
import { FatCCasesModule } from "./cases/cases.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { AuthComponent } from "./auth-token/auth.component";
import { AuthModule } from "./auth-token/auth.module";
import { LoginService } from "./login/login-service";
import { LoginActions } from "./login/login.actions";
import { AuthGuard } from "./shared/auth.guard";
import { NgReduxModule, NgRedux, DevToolsExtension } from "@angular-redux/store";
import { createLogger } from "redux-logger";
import { IAppState, rootReducer } from "./store";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { CasesComponent } from "./cases/cases.component";
import { CaseConfigurationModule } from "./case-configuration/case-configuration.module";
import { CaseConfigurationComponent } from "./case-configuration/case-configuration.component";
import { CaseRunModule } from "./case-run/case-run.module";
import { CaseRunComponent } from "./case-run/case-run.component";
import { environment } from "../environments/environment";
import { AlertModule } from "ngx-bootstrap";
import { FatCLoginModule } from "./login/login.component.module";
import { LoginComponent } from "./login/login.component";
import { CaseHistoryComponent } from "./case-history/case-history.component";
import { CaseHistoryActions } from "./case-history/case-history.actions";
import { CaseHistoryService } from "./case-history/case-history.service";

///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////

@NgModule({
  declarations: [
    AppComponent,
    AlertsDirective,
    CaseHistoryComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ButtonsModule,
    ReactiveFormsModule,
    HttpModule,
    NgReduxModule,
    AlertModule.forRoot(),
    CaseRunModule,
    FatCLoginModule,
    BannerModule,
    AuthenticateModalModule,
    UserModule,
    FatCCasesModule,
    AdminModule,
    CaseConfigurationModule,
    AuthModule,
    RouterModule.forRoot([
      { path: "home", component: LoginComponent },
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
      { path: "admin-page", component: AdminComponent, canActivate: [AuthGuard] },
      { path: "auth-page", component: AuthComponent, canActivate: [AuthGuard] },
      { path: "cases", component: CasesComponent, canActivate: [AuthGuard] },
      { path: "user", component: UserComponent, canActivate: [AuthGuard] },
      { path: "case-configuration/:caseID", component: CaseConfigurationComponent, canActivate: [AuthGuard] },
      { path: "case-run/:caseID", component: CaseRunComponent, canActivate: [AuthGuard] },
      { path: "case-history/:caseID", component: CaseHistoryComponent, canActivate: [AuthGuard] },
    ]),
  ],
  providers: [LoginActions, CasesActions, CasesManagerService, UserActions, CurrentCaseService,
    LoginService, AuthGuard, AlertsActions, AdminActions, AdminService, UserService, CaseHistoryActions, CaseHistoryService,
    CaseConfigurationService, CaseConfigurationActions, AlertModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
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
