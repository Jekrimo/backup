import { CaseConfigurationActions } from "../../case-configuration/case-configuration.actions";
import { CurrentCaseService } from "./current-case.service";
import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AjaxTrio } from "../ajaxTrio.class";
import { IAppState } from "../../store";

///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@Injectable()
export class CurrentCaseActions {

  static CURRENT_CASE_GET_CASE_CONFIG_BY_ID_AJAX_TRIO = new AjaxTrio(
    "CURRENT_CASE_GET_CASE_CONFIG_BY_ID_AJAX_TRIO",
    "Getting collector configuration...",
    "Successfully got collector configuration",
    "Failed to start collector configuration"
  );

  static CURRENT_CASE_GET_CASE_BY_ID_AJAX_TRIO = new AjaxTrio(
    "CURRENT_CASE_GET_CASE_BY_ID_AJAX_TRIO",
    "Getting collector case...",
    "Successfully got collector case",
    "Failed to start collector case"
  );

  constructor(private _currentCaseService: CurrentCaseService,
  private _configurationActions: CaseConfigurationActions,
              private _ngRedux: NgRedux<IAppState>) {

  }

  /**
   * Load a case configuration based on the case id
   * @param {number} caseID
   * @memberOf CaseConfigurationActions
   */
  getCaseConfigurationByCaseId(caseID: number) {
    this._currentCaseService.getCaseConfigurationByCaseId(caseID)
      .then((configuration) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CurrentCaseActions.CURRENT_CASE_GET_CASE_CONFIG_BY_ID_AJAX_TRIO, { configuration });
        // Race condition fix here to grab summaries to attach to collectors.
        this._configurationActions.getCaseEstimatesByCaseId(caseID);
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CurrentCaseActions.CURRENT_CASE_GET_CASE_CONFIG_BY_ID_AJAX_TRIO, error));
  }

  /**
   * Get the user case information
   * @param caseID - integer value referring to the case ID
   */
  getCurrentCase(caseID: number) {
    return this._currentCaseService.getCaseById(caseID)
      .then((singleCase) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CurrentCaseActions.CURRENT_CASE_GET_CASE_BY_ID_AJAX_TRIO, { singleCase });
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CurrentCaseActions.CURRENT_CASE_GET_CASE_BY_ID_AJAX_TRIO, error));
  }

}
