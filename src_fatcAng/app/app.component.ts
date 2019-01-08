import { AlertsActions } from "./alerts/alerts.actions";
import { Alert } from "./alerts/alert.class";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { NgRedux, select } from "@angular-redux/store";
import { IAppState } from "./store";
import { CurrentCaseService } from "./shared/current-case/current-case.service";
import { CurrentCaseActions } from "./shared/current-case/current-case.actions";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
/**
 * @description Main level component
 */
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [CurrentCaseActions, CurrentCaseService]
})
export class AppComponent  {
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

  /**
   * @param ngRedux - state access
   * @param router - router instance
   * @param _alertsActions
   */
  constructor(private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private _alertsActions: AlertsActions) {
  }

  onDismissAlert(alertId: string) {
    this._alertsActions.removeAlert(alertId);
  }

  public clickCasesLink() {
    this.router.navigate(["/case"]);
  }
  public clickHomeLink() {
    this.router.navigate(["/home"]);
  }
}
