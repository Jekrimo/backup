

import { combineReducers, Reducer } from 'redux';
import { Alert} from './Shared/alerts/alert.class';
import {alertsReducer} from './Shared/alerts/alerts.reducer';
import { testReducer} from './rosm-homepage/home.reducer';
// import { Alert } from "./alerts/alert.class";
// import { alertsReducer } from "./alerts/alerts.reducer";

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
  state?: {};
  alerts?: Alert[];
};

/**
 * Root reducer for redux store
 * @type {Reducer<IAppState>}
 */
export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  temp: testReducer,
  alerts: alertsReducer
});

