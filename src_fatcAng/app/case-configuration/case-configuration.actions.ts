import { Router } from "@angular/router";
import { CaseConfigurationService } from "./case-configuration.service";
import { Injectable } from "@angular/core";
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import {
  ICaseConfig,
  ICaseDTO, ICollectorAuthRequest,
  ICollectorConfiguration,
  ICollectorTypes,
} from "../shared/data.dto";
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
 * Case Configuration actions for Page
 * @author Shaun Shepherd (sshepherd@ara.com)
 */
@Injectable()
export class CaseConfigurationActions {

  static CASE_COLLECTOR_CONFIGURATION_ADD = "CASE_COLLECTOR_CONFIGURATION_ADD";
  static CASE_COLLECTOR_CONFIGURATION_SELECT = "CASE_COLLECTOR_CONFIGURATION_SELECT";
  static CASE_COLLECTOR_CONFIGURATION_UPDATE_ALIAS = "CASE_COLLECTOR_CONFIGURATION_UPDATE_ALIAS";
  static CASE_COLLECTOR_CONFIGURATION_UPDATE_COLLECTOR_TYPE = "CASE_COLLECTOR_CONFIGURATION_UPDATE_COLLECTOR_TYPE";
  static CASE_MOVE_COLLECTOR_UP = "CASE_MOVE_COLLECTOR_UP";
  static CASE_MOVE_COLLECTOR_DOWN = "CASE_MOVE_COLLECTOR_DOWN";
  static CASE_COLLECTORS_CLEAR = "CASE_COLLECTORS_CLEAR";
  static RUN_COLLECTORS_IN_OPTION = "RUN_COLLECTORS_IN_OPTION";

  static CASE_UPDATE = new AjaxTrio(
    "CASE_UPDATE",
    "Updating Case...",
    "Successfully updated case!",
    "Failed to update case!"
  );

  static CASE_CONFIG_CREATE_AJAX_TRIO = new AjaxTrio(
    "CASE_CONFIG_CREATE_AJAX_TRIO",
    "Creating Case Configuration...",
    "Successfully created case configuration!",
    "Failed to create case configuration!"
  );

  static CASE_CONFIG_CREATE_AND_AUTH_AJAX_TRIO = new AjaxTrio(
    "CASE_CONFIG_CREATE_AND_AUTH_AJAX_TRIO",
    "Creating Case Configuration and AUTH...",
    "Successfully created case configuration with auth!",
    "Failed to create case configuration with auth!"
  );

  static CASE_DELETE_COLLECTOR_AJAX_TRIO = new AjaxTrio(
    "CASE_DELETE_COLLECTOR_AJAX_TRIO",
    "Deleting a collector...",
    "Successfully deleted a collector!",
    "Failed to delete a collector!"
  );

  static CASE_CONFIG_GET_AUTH_URL_AJAX_TRIO = new AjaxTrio(
    "CASE_CONFIG_GET_AUTH_URL_AJAX_TRIO",
    "Getting authorization url...",
    "Successfully retrieved auth url from collector",
    "Failed to get authorization url from collector"
  );

  static CASE_CONFIG_GET_ALL_COLLECTOR_TYPES_AJAX_TRIO = new AjaxTrio(
    "CASE_CONFIG_GET_ALL_COLLECTORS_AJAX_TRIO",
    "Getting all collector types..",
    "Successfully got all collector types!",
    "Failed to get all collector types!"
  );

  static CASE_CONFIG_UPDATE_AJAX_TRIO = new AjaxTrio(
    "CASE_CONFIG_UPDATE_AJAX_TRIO",
    "Updating case configuration...",
    "Successfully updated case configuration!",
    "Failed to update case configuration!"
  );

  static CASE_CONFIG_GET_ESTIMATE_AJAX_TRIO = new AjaxTrio(
    "CASE_CONFIG_GET_ESTIMATE_AJAX_TRIO",
    "Getting aquisition summary...",
    "Successfully updated aquisition summary!",
    "Failed to update aquisition summary!"
  );

  static CASE_CONFIG_GET_ALL_SUMMARY_ESTIMATES_AJAX_TRIO = new AjaxTrio(
    "CASE_CONFIG_GET_ALL_SUMMARY_ESTIMATES_AJAX_TRIO",
    "Getting aquisition all summaries...",
    "Successfully got all aquisition summary!",
    "Failed to get all the aquisition summary!"
  );

  static CASE_CONFIG_SET_AUTH_CODE_AJAX_TRIO = new AjaxTrio(
    "CASE_CONFIG_SET_AUTH_CODE_AJAX_TRIO",
    "Saving authorization...",
    "Successfully saved authorization",
    "Failed to save authorization"
  );

   static CASE_CONFIG_ADD_ALL_COLLECTORS_AJAX_TRIO = new AjaxTrio(
     "CASE_CONFIG_ADD_ALL_COLLECTORS_AJAX_TRIO",
     "Adding all available collectors...",
     "Successfully added all loaded collectors!",
     "Failed to add collectors!"
   );

   @select(["casesInfo", "currentCase", "configurations"]) collectors$: Observable<ICollectorConfiguration[]>;

   public newCreatedCollector: ICollectorConfiguration;
   public collectors: ICollectorConfiguration[];

  /**
   * Constructor for actions
   */
  constructor(private _ngRedux: NgRedux<IAppState>,
    private _caseConfigService: CaseConfigurationService,
    private _router: Router) {
      this.collectors$.subscribe(value => {
      this.collectors = value;
    })
  }

  /**
   * Create a case configuration
   * @param {ICaseConfig} caseConfiguration
   * @memberOf CaseConfigurationActions
   */
  createCaseConfiguration(caseConfiguration: ICaseConfig) {
    this._caseConfigService.createNewConfiguration(caseConfiguration)
      .then(() =>
        AjaxTrio.dispatchSuccessAction(this._ngRedux,
          CaseConfigurationActions.CASE_CONFIG_CREATE_AJAX_TRIO, { caseConfiguration }))
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux,
        CaseConfigurationActions.CASE_CONFIG_CREATE_AJAX_TRIO, error));
  }

  /**
   * Create Collector and AUth it
   * @param {ICollectorConfiguration} config
   * * @param {authCode} caseConfig
   * @memberOf CaseConfigurationActions
   */
  createCollectorWithAuth(config: ICollectorConfiguration) {
    if (this.collectors === null) {
      config.indexNumber = 0;
    } else {
    config.indexNumber = this.collectors.length;
  }
    this._caseConfigService.saveAuthCode(config)
      .then((createdCollector: any) => {
        this.newCreatedCollector = createdCollector;
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CaseConfigurationActions.CASE_CONFIG_CREATE_AND_AUTH_AJAX_TRIO, { createdCollector });
      })
      .then(() => {
        this.getCollectionEstimate(this.newCreatedCollector.caseID, this.newCreatedCollector.id)
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CaseConfigurationActions.CASE_CONFIG_CREATE_AND_AUTH_AJAX_TRIO, ""));
  }

  /**
   * Clear collectors from state
   * @param none
   * @memberOf CaseConfigurationActions
   */
  clearCaseCollectors() {
    this._ngRedux.dispatch({
      type: CaseConfigurationActions.CASE_COLLECTORS_CLEAR,
      payload: null
    });
  }

    /**
   * Get's all estimate summary's based on case id
   * @param caseID - number
   * @memberOf CaseConfigurationActions
   */
  getCaseEstimatesByCaseId(caseID: number) {
    this._caseConfigService.getCurrentCaseEstimates(caseID)
      .then((summaries) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux,
          CaseConfigurationActions.CASE_CONFIG_GET_ALL_SUMMARY_ESTIMATES_AJAX_TRIO, { summaries });
      });
  }

  /**
   * Update an existing case configuration
   * @param {ICaseConfig} caseConfig
   * @memberOf CaseConfigurationActions
   */
  updateCaseConfiguration(caseConfig: ICaseConfig): Promise<any> {
    return this._caseConfigService.updateCaseConfiguration(caseConfig)
      .then((updated: ICaseConfig) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CaseConfigurationActions.CASE_CONFIG_UPDATE_AJAX_TRIO, { updated });
        // ferry the updated response to anyone downstream interested
        return Promise.resolve(updated);
      }).then(() => {
        this.getCaseEstimatesByCaseId(caseConfig.case.id);
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CaseConfigurationActions.CASE_CONFIG_UPDATE_AJAX_TRIO, error));
  }

  /**
   * Add a collector to the current case
   * @param {ICollectorConfiguration} collectorConfiguration
   * @memberOf CaseConfigurationActions
   */
  addCollectorConfiguration(collectorConfiguration: ICollectorConfiguration, curConfig: ICaseConfig): void {
    this._ngRedux.dispatch({
      type: CaseConfigurationActions.CASE_COLLECTOR_CONFIGURATION_ADD,
      payload: { collectorConfiguration, curConfig }
    });

  }

  /**
   * delete collector
   * @param {collectorId} collectorId
   * @memberOf CaseConfigurationActions
   */
  deleteCollector(collectorID: number): any {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      CaseConfigurationActions.CASE_DELETE_COLLECTOR_AJAX_TRIO);

    this._caseConfigService.deleteCollector(collectorID)
      .then(() => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CaseConfigurationActions.CASE_DELETE_COLLECTOR_AJAX_TRIO, {
          collectorID
        });
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CaseConfigurationActions.CASE_DELETE_COLLECTOR_AJAX_TRIO, error));
  }

  /**
   * Add all collectors
   * @param none
   * @memberOf CaseConfigurationActions
   */
  AddAllCollectors(allAvailableCollectors: ICollectorTypes[]): void {
    this._ngRedux.dispatch({
      type: CaseConfigurationActions.CASE_CONFIG_ADD_ALL_COLLECTORS_AJAX_TRIO,
      payload: allAvailableCollectors
    });
  }

  runCollectorsInOptions(option: boolean): void {
    this._ngRedux.dispatch({
      type: CaseConfigurationActions.RUN_COLLECTORS_IN_OPTION,
      payload: option
    });
  }

  /**
   * Update the collector for the case config
   * @param {ICollectorConfiguration} collectorConfiguration
   * @memberOf CaseConfigurationActions
   * */
  updateCollectorConfigurationAlias(configID: number, newAlias: string): void {
    this._ngRedux.dispatch({
      type: CaseConfigurationActions.CASE_COLLECTOR_CONFIGURATION_UPDATE_ALIAS,
      payload: { configID, newAlias }
    });
  }

  updateCollectorConfigurationCollectorType(configID: number, typeName: string): void {
    this._ngRedux.dispatch({
      type: CaseConfigurationActions.CASE_COLLECTOR_CONFIGURATION_UPDATE_COLLECTOR_TYPE,
      payload: { configID, typeName }
    });
  }

/**
   * Update the case information
   * @param {ICaseDTO} updatedCase
   * @memberOf CaseConfigurationActions
   * */
  updateCase(updatedCase: ICaseDTO): void {
    this._ngRedux.dispatch({
      type: CaseConfigurationActions.CASE_UPDATE,
      payload: updatedCase
    });
  }

  /**
   * getCollectionEstimate gets the acquisition summary for a given collection config id
   */
  getCollectionEstimate(caseId: number, configID: number) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      CaseConfigurationActions.CASE_CONFIG_GET_ESTIMATE_AJAX_TRIO);

    this._caseConfigService.getCollectionEstimate(configID)
      .then((estimate) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CaseConfigurationActions.CASE_CONFIG_GET_ESTIMATE_AJAX_TRIO, {
          configID,
          estimate
        });
        this.getCaseEstimatesByCaseId(caseId);
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CaseConfigurationActions.CASE_CONFIG_GET_ESTIMATE_AJAX_TRIO, error));
  }

  getAvailableCollectorTypes() {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(),
      this._ngRedux, CaseConfigurationActions.CASE_CONFIG_GET_ALL_COLLECTOR_TYPES_AJAX_TRIO);

    return this._caseConfigService.getAvailableCollectors()
      .then(collectors => {
        // dont send collectors directly as payload, since this helper puts alert on the payload,
        // that forces javascript to type the array out to a keyed object
        AjaxTrio.dispatchSuccessAction(this._ngRedux,
          CaseConfigurationActions.CASE_CONFIG_GET_ALL_COLLECTOR_TYPES_AJAX_TRIO, { collectors });
      })
      .catch(err => AjaxTrio.dispatchErrorAction(this._ngRedux,
        CaseConfigurationActions.CASE_CONFIG_GET_ALL_COLLECTOR_TYPES_AJAX_TRIO, err));
  }

  // having typed promise breaks the entire site. very cool
  getAuthURL(collectorName: string) { //: Promise<ICollectorAuthRequest> {
    console.log("get auth url action");
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(),
      this._ngRedux, CaseConfigurationActions.CASE_CONFIG_GET_AUTH_URL_AJAX_TRIO);

    return this._caseConfigService.getAuthURL(collectorName)
      .then(authRequest => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux,
          CaseConfigurationActions.CASE_CONFIG_GET_AUTH_URL_AJAX_TRIO, { authRequest });
        return authRequest;
      })
      .catch(err => AjaxTrio.dispatchErrorAction(this._ngRedux,
        CaseConfigurationActions.CASE_CONFIG_GET_AUTH_URL_AJAX_TRIO, err));
  }
}
