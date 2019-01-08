import { Directive, OnInit, OnDestroy } from "@angular/core";
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from "@angular/material";
import { select } from "@angular-redux/store";
import { Alert, AlertType } from "./alert.class";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@Directive({
  selector: "[appAlerts]"
})
export class AlertsDirective implements OnInit, OnDestroy {

  @select(["alerts"]) alerts$: Observable<Alert[]>;

  subscription: Subscription;
  snackBars: MatSnackBarRef<SimpleSnackBar>[] = [];

  constructor(private _mdSnackBar: MatSnackBar) {
    console.log("snakbar fuck face", this.alerts$);
  }

  ngOnInit() {
    this.subscription = this.alerts$.subscribe(
      (alerts: Alert[]) => {
        console.log("snakbar fuck face", alert);

        // dismiss any previous snack bars
        this.snackBars.forEach(sb => sb.dismiss());

        // record new snack bars
        this.snackBars = alerts
          .filter(alert => alert.type === AlertType.info || alert.type === AlertType.warning) // only show warnings or info
          .map(alert => this._mdSnackBar.open(alert.message));
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
