import {merge} from "ramda";

import { IAction } from "../store";
import { CasesRunCollectorsActions } from "./case-run.actions";
import { INITIAL_STATE } from "../shared/initial-state";
import {
  ICasesRunState,
} from "../shared/data.dto";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////

//nothing is happening here yet, I have a feeling we will need it for the updates on collectors and then
//to set up an observable to watch progess info.
export const runCollectorsReducer = (state: ICasesRunState = INITIAL_STATE.tempCollector, action: IAction): ICasesRunState => {
  switch (action.type) {
    case CasesRunCollectorsActions.CASE_RUN_COLLECTOR_SERIES_AJAX_TRIO.SUCCESS:
      return merge(state, action.payload.returnEstimate);
    default:
      return state;
  }
};
