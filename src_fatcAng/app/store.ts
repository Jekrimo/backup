import { usersReducer } from "./admin/admin.reducer";
import { casesStateReducer } from "./cases/cases.reducer";
import { loginReducer } from "./login/login.reducer";
import { ICasesState } from "./shared/data.dto";

import { combineReducers } from "redux";
import { Reducer } from "redux";

import { Alert } from "./alerts/alert.class";
import { alertsReducer } from "./alerts/alerts.reducer";
import { ILoginState } from "./login/login.models";

///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////

/**
 * Typing for redux action
 */
export interface IAction {
  type: string;
  payload?: any;
}

/**
 * Typing for app stage tree
 */
export interface IAppState {
  login?: ILoginState;
  usersInfo?: Array<any>;
  casesInfo?: ICasesState;
  alerts?: Alert[];
}

/**
 * Root reducer for redux store
 * @type {Reducer<IAppState>}
 */
export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  usersInfo: usersReducer,
  login: loginReducer,
  casesInfo: casesStateReducer,
  alerts: alertsReducer
});


