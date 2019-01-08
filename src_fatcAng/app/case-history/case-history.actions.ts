
import { Injectable } from "@angular/core";
import { AjaxTrio } from "../shared/ajaxTrio.class";
import { CaseHistoryService } from "./case-history.service";
import { IAppState } from "../store";
import { NgRedux } from "@angular-redux/store";
import { ICaseCollectionHistory } from "../shared/data.dto";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@Injectable()
export class CaseHistoryActions {
  static CASE_HISTORY_GET = new AjaxTrio(
    "CASE_HISTORY_GET",
    "Getting case collections...",
    "Retrieved case collections",
    "Failed to retrieve case collection history"
  );

  static CASE_HISTORY_DELETE = new AjaxTrio(
    "CASE_HISTORY_DELETE",
    "Deleting case history...",
    "Deleted case history",
    "Failed to delete case history"
  );

  constructor(private _ngRedux: NgRedux<IAppState>,
              private _caseHistoryService: CaseHistoryService) {
  }

  public getCaseHistory(caseID: number): Promise<any> {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      CaseHistoryActions.CASE_HISTORY_GET);

    return this._caseHistoryService.getCaseHistory(caseID).then(r =>
      // you have to pull response into a key somewhere or else ajax trio helper will murder arrays into objects
      AjaxTrio.dispatchSuccessAction(this._ngRedux, CaseHistoryActions.CASE_HISTORY_GET, {resp: r})
    ).catch(err =>
      AjaxTrio.dispatchErrorAction(this._ngRedux, CaseHistoryActions.CASE_HISTORY_GET, err)
    );
  }

  public deleteCaseHistory(caseID: number, history: ICaseCollectionHistory): Promise<any> {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      CaseHistoryActions.CASE_HISTORY_DELETE);

    return this._caseHistoryService.deleteCaseHistory(caseID, history).then(r =>
      // you have to pull response into a key somewhere or else ajax trio helper will murder arrays into objects
      AjaxTrio.dispatchSuccessAction(this._ngRedux, CaseHistoryActions.CASE_HISTORY_DELETE, {
        caseID,
        history,
      })
    ).catch(err =>
      AjaxTrio.dispatchErrorAction(this._ngRedux, CaseHistoryActions.CASE_HISTORY_DELETE, err)
    );
  }

}
