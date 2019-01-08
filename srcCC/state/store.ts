// import { loginReducer } from "./admin/admin.reducer";
// import { casesStateReducer } from "../components/collectors.reducer";
import { collectorReducer, collectorTypesReducer } from '../pages/collector-configuration/collector-config.reducer';
import { loginReducer } from "../components/login/login.reducer";
import { ICasesState } from "../shared/data.dto";

import { combineReducers } from "redux";
import { Reducer } from "redux";

import { Alert } from "../components/alerts/alert.class";
import { alertsReducer } from "../components/alerts/alerts.reducer";
import { ILoginState } from "../components/login/login.models";
import { applyMiddleware, createStore } from 'redux';

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
  // login?: ILoginState;
  usersInfo?: ILoginState;
  collectorInfo?: ICasesState;
  alerts?: Alert[];
}

/**
 * Root reducer for redux store
 * @type {Reducer<IAppState>}
 */
export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  usersInfo: loginReducer,
  // login: loginReducer,
  collectors: collectorReducer,
  alerts: alertsReducer
});


