import { AlertsActions } from './alerts.actions';
import { Directive, OnInit, OnDestroy } from "@angular/core";
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from "@angular/material";
import { select } from "@angular-redux/store";
import { Alert, AlertType } from "./alert.class";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

@Directive({
  selector: "[appAlerts]",
})
export class AlertsDirective implements OnInit, OnDestroy {

  @select(["alerts"]) alerts$: Observable<Alert[]>;

  subscription: Subscription;
  snackBars: MatSnackBarRef<SimpleSnackBar>[] = [];

  constructor(private _mdSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.subscription = this.alerts$.subscribe(
      (alerts: Alert[]) => {

        // dismiss any previous snack bars
        this.snackBars.forEach(sb => sb.dismiss());

        // record new snack bars
        this.snackBars = alerts
          .filter(alert => { alert.type === AlertType.info || alert.type === AlertType.warning}) // only show warnings or info
          .map(alert => this._mdSnackBar.open(alert.message));
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
