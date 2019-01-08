import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AlertType, Alert } from "./alert.class";
import { IAppState } from "../../state/store";

@Injectable()
export class AlertsActions {

  // action types
  static ALERTS_REMOVE = "ALERTS_REMOVE";
  static ALERTS_CREATE = "ALERTS_CREATE";

  constructor(private _ngRedux: NgRedux<IAppState>) {
  }

  /**
   * Remove the alert with the specified id
   * @param alertId
   */
  removeAlert(alertId: string) {
    this._ngRedux.dispatch({
      type: AlertsActions.ALERTS_REMOVE,
      payload: {
        alertId
      }
    });
  }

  /**
   * Create an alert with the specified properties
   * @param id
   * @param type
   * @param message
   */
  createAlert(id: string, type: AlertType, message: string) {
    this._ngRedux.dispatch({
      type: AlertsActions.ALERTS_CREATE,
      payload: {
        alert: new Alert(id, type, message)
      }
    });
  }
}
