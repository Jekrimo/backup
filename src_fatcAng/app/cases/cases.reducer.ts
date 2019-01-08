import { runCollectorsReducer } from "../case-run/case-run.reducer";
import { combineReducers } from "redux";
import { IAction } from "../store";
import { CasesActions } from "./cases.actions";
import { ICaseDTO, ICasesState } from "../shared/data.dto";
import { INITIAL_STATE } from "../shared/initial-state";
import {
  queuedCollectorReducer,
  collectorTypesReducer,
  selectedCollectorReducer
} from "../case-configuration/case-configuration.reducer";
import { currentCaseReducer } from "../shared/current-case/current-case.reducer";
import { caseHistoryReducer } from "../case-history/case-history.reducer";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
/**
 * Cases reducer
 */

export const casesReducer = (state: ICaseDTO[] = INITIAL_STATE.cases, action: IAction): ICaseDTO[] => {
  switch (action.type) {
    case CasesActions.CASE_GET_ALL_AJAX_TRIO.SUCCESS:
      return action.payload.allCurrentCases;
    case CasesActions.CASE_CREATE_BY_ID_AJAX_TRIO.SUCCESS:
      return [...state, action.payload.newlyCreatedCase];
    default:
      return state;
  }
};
/**
 * Combine the reducers
 */
export const casesStateReducer = combineReducers<ICasesState>({
  cases: casesReducer,
  currentCase: currentCaseReducer,
  selectedCollectorIndex: selectedCollectorReducer,
  queuedCollectors: queuedCollectorReducer,
  collectorTypes: collectorTypesReducer,
  runCollector: runCollectorsReducer,
  caseHistory: caseHistoryReducer,
});
