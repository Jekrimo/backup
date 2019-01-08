import { Router } from "@angular/router";
import { CasesManagerService } from "./cases.service";
import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { AjaxTrio } from "../shared/ajaxTrio.class";
import { IAppState } from "../store";
import { ICaseDTO } from "../shared/data.dto";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
/**
 * Case actions for operations on case objects
 * @author Jeff Morris (jmorris@ara.com)
 */

@Injectable()
export class CasesActions {

  static CASE_GET_ALL_AJAX_TRIO = new AjaxTrio(
    "CASE_GET_ALL_AJAX_TRIO",
    "Loading Case...",
    "Successfully loaded cases!",
    "Failed to load cases!"
  );

  static CASE_CREATE_BY_ID_AJAX_TRIO = new AjaxTrio(
    "CASE_CREATE_BY_ID_AJAX_TRIO",
    "Loading Case...",
    "Successfully loaded case!",
    "Case already exists!"
  );

  constructor(private _ngRedux: NgRedux<IAppState>,
    private _CasesService: CasesManagerService,
    private _router: Router) {
  }

  /**
   * Get all cases for the user
   */

  getUserCases() {
    this._CasesService.getCurrentCases()
      .then((allCurrentCases) => AjaxTrio.dispatchSuccessAction(this._ngRedux, CasesActions.CASE_GET_ALL_AJAX_TRIO, { allCurrentCases }))
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CasesActions.CASE_GET_ALL_AJAX_TRIO, error));
  }

  /**
   * Create an empty FatC case object with name/alias
   * @param newCaseName - empty case object with name/alias
   */

  createNewFatCCase(newCaseName: ICaseDTO) {
    this._CasesService.createNewCase(newCaseName)
      .then((newlyCreatedCase: ICaseDTO) => AjaxTrio.dispatchSuccessAction(
        this._ngRedux, CasesActions.CASE_CREATE_BY_ID_AJAX_TRIO, { newlyCreatedCase }
      ))
      .catch(error =>
        AjaxTrio.dispatchErrorAction(this._ngRedux, CasesActions.CASE_CREATE_BY_ID_AJAX_TRIO, error));
  }
}
