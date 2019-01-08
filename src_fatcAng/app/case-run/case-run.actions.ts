import { RunCasesService } from "./case-run.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import { AjaxTrio } from "../shared/ajaxTrio.class";
import { IAppState } from "../store";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
/**
 * Run Collector actions for operations on collector objects
 * @author Jeff Morris (jmorris@ara.com)
 */
@Injectable()
export class CasesRunCollectorsActions {

  static CASE_ABORT_COLLECTOR_AJAX_TRIO = new AjaxTrio(
    "CASE_ABORT_COLLECTOR_AJAX_TRIO",
    "Stopping collector...",
    "Successfully stopped the collector",
    "Failed to stop the collector"
  );

  static CASE_RUN_COLLECTOR_SERIES_AJAX_TRIO = new AjaxTrio(
    "CASE_RUN_COLLECTOR_SERIES_AJAX_TRIO",
    "Starting collector series...",
    "Successfully started collector series",
    "Failed to start collector series"
  );

  constructor(private _ngRedux: NgRedux<IAppState>,
    private _router: Router,
    private _caseRunService: RunCasesService, ) {
  }

  /**
   * runCollectorInSeries starts all collectors to dl one after another on run in series click
   * on case-run page
   * @param configID
   */
  runCollectorInSeries(collectorId: number) {
    this._caseRunService.runCollectorConfig(collectorId)
      .then((tempCollector) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CasesRunCollectorsActions.CASE_RUN_COLLECTOR_SERIES_AJAX_TRIO, { tempCollector });
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CasesRunCollectorsActions.CASE_RUN_COLLECTOR_SERIES_AJAX_TRIO, error));
  }
}
