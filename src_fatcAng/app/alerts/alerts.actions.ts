import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AlertType, Alert } from "./alert.class";
import { IAppState } from "../store";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
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
