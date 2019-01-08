import { ICaseCollectionHistory } from "../shared/data.dto";
import { IAction } from "../store";
import { CaseHistoryActions } from "./case-history.actions";
import { reject } from "ramda";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
export const caseHistoryReducer = (state: ICaseCollectionHistory[] = [], action: IAction): ICaseCollectionHistory[] => {
  switch (action.type) {
    case CaseHistoryActions.CASE_HISTORY_GET.SUCCESS:
      return action.payload.resp;
    case CaseHistoryActions.CASE_HISTORY_DELETE.SUCCESS: {
      // TODO: consider sending the current state from server again here
      const deleted = <ICaseCollectionHistory>action.payload.history;
      return reject(h => h.id === deleted.id, state);
    }
    default:
      return state;
  }
};
