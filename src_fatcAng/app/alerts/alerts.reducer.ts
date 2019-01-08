import * as R from "ramda";
import { Alert } from "./alert.class";
import { IAction } from "../store";
import { AlertsActions } from "./alerts.actions";
import { WhiteListAlerts } from "./alerts.whitelist";

/**
 * Immutably removes (if present) any alerts with the specified id from the specified collection of alerts
 * @param id
 * @param alerts
 */
function removeAlert(id: string, alerts: Alert[]): Alert[] {
  return R.reject(alert => alert.id === id, alerts);
}

/**
 * Checks action against White List to see if we want to display alert to client
 * @param alerts
 */
function displayUserAlert(action: IAction) {
  const matchingAlert = WhiteListAlerts.find(x => x === action.payload.alert.id)
  return matchingAlert
}

/**
 * Reducer for state.alerts
 *
 * @param state
 * @param action
 * @returns {any}
 *
 */

export const alertsReducer = (state: Alert[] = [], action: IAction): Alert[] => {

  // if the action has a payload and that payload has an alert on it, add the alert
  if (action.payload && action.payload.alert) {
    if (displayUserAlert(action)) {
      return R.append(action.payload.alert)(removeAlert(action.payload.alert.id, state));
    } else {
      return state;
    }

  } else {

    if (action.payload && action.payload.alertId) {
      switch (action.type) {
        // remove alert by id
        case AlertsActions.ALERTS_REMOVE:
          return removeAlert(action.payload.alertId, state);
        // add a new alert, first removing any alert with the same id (if present)
        // (i.e., there can never be two alerts with the same id in state)
        case AlertsActions.ALERTS_CREATE:

          if (action.payload.alert) {
            return R.append(action.payload.alert)(removeAlert(action.payload.alert.id, state));
          }
          return state;
        default:
          return state;
      }
    }
    return state;
  }
};
