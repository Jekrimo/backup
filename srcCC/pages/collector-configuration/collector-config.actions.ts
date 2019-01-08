import { Router } from "@angular/router";
import { CollectorConfigurationService } from "./collector-config.service";
import { Injectable } from "@angular/core";
import { NgRedux, select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";
import {
  ICaseConfig,
  ICaseDTO,
   ICollectorAuthRequest,
  ICollectorConfiguration,
  ICollectorTypes,
} from "../../shared/data.dto";

import { AjaxTrio } from "../../shared/ajaxTrio.class";
import { IAppState } from "../../state/store";
import { indexOf } from "ramda"
/**
 * Case Configuration actions for Page
 * @author Shaun Shepherd (sshepherd@ara.com)
 */
@Injectable()
export class CollectorConfigurationActions {

  static CASE_COLLECTOR_CONFIGURATION_ADD = "CASE_COLLECTOR_CONFIGURATION_ADD";
  static CASE_COLLECTOR_CONFIGURATION_SELECT = "CASE_COLLECTOR_CONFIGURATION_SELECT";
  static CASE_COLLECTOR_CONFIGURATION_UPDATE_ALIAS = "CASE_COLLECTOR_CONFIGURATION_UPDATE_ALIAS";
  static CASE_COLLECTOR_CONFIGURATION_UPDATE_COLLECTOR_TYPE = "CASE_COLLECTOR_CONFIGURATION_UPDATE_COLLECTOR_TYPE";
  static CASE_MOVE_COLLECTOR_UP = "CASE_MOVE_COLLECTOR_UP";
  static CASE_MOVE_COLLECTOR_DOWN = "CASE_MOVE_COLLECTOR_DOWN";
  static CASE_COLLECTORS_CLEAR = "CASE_COLLECTORS_CLEAR";
  static RUN_COLLECTORS_IN_OPTION = "RUN_COLLECTORS_IN_OPTION";
  static NEW_USER_CHECK = "NEW_USER_CHECK";

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

   static CASE_CREATE_BY_ID_AJAX_TRIO = new AjaxTrio(
    "CASE_CREATE_BY_ID_AJAX_TRIO",
    "Loading Case...",
    "Successfully loaded case!",
    "Case already exists!"
  );

  static CURRENT_CASE_GET_CASE_BY_ID_AJAX_TRIO = new AjaxTrio(
    "CURRENT_CASE_GET_CASE_BY_ID_AJAX_TRIO",
    "Getting collector case...",
    "Successfully got collector case",
    "Failed to start collector case"
  );

  static CASE_GET_ALL_AJAX_TRIO = new AjaxTrio(
    "CASE_GET_ALL_AJAX_TRIO",
    "Loading Case...",
    "Successfully loaded cases!",
    "Failed to load cases!"
  );

  static CURRENT_CASE_GET_CASE_CONFIG_BY_ID_AJAX_TRIO = new AjaxTrio(
    "CURRENT_CASE_GET_CASE_CONFIG_BY_ID_AJAX_TRIO",
    "Getting collector configuration...",
    "Successfully got collector configuration",
    "Failed to start collector configuration"
  );

   public newCreatedCollector: ICollectorConfiguration;

  /**
   * Constructor for actions
   */
  constructor(private _ngRedux: NgRedux<IAppState>,
    private _collectorConfigService: CollectorConfigurationService,
    private _router: Router) {

  }

  /**
   * Create a case configuration
   * @param {ICaseConfig} caseConfiguration
   * @memberOf CollectorConfigurationActions
   */
  createCaseConfiguration(caseConfiguration: ICaseConfig) {
    this._collectorConfigService.createNewConfiguration(caseConfiguration)
      .then(() =>
        AjaxTrio.dispatchSuccessAction(this._ngRedux,
          CollectorConfigurationActions.CASE_CONFIG_CREATE_AJAX_TRIO, { caseConfiguration }))
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux,
        CollectorConfigurationActions.CASE_CONFIG_CREATE_AJAX_TRIO, error));
  }

  /**
   * Create Collector and AUth it
   * @param {ICollectorConfiguration} config
   * * @param {authCode} caseConfig
   * @memberOf CollectorConfigurationActions
   */
  createCollectorWithAuth(config: ICollectorConfiguration) {

    this._collectorConfigService.saveAuthCode(config)
      .then((createdCollector: any) => {
        this.newCreatedCollector = createdCollector;
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CollectorConfigurationActions.CASE_CONFIG_CREATE_AND_AUTH_AJAX_TRIO, { createdCollector });
      })
      .then(() => {
        this.getCollectionEstimate(this.newCreatedCollector.caseID, this.newCreatedCollector.id)
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CollectorConfigurationActions.CASE_CONFIG_CREATE_AND_AUTH_AJAX_TRIO, error));
  }

    /**
   * Load a case configuration based on the case id
   * @param {number} caseID
   * @memberOf CaseConfigurationActions
   */
  getCaseConfigurationByCaseId(caseID: number) {
    this._collectorConfigService.getCaseConfigurationByCaseId(caseID)
      .then((configuration) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CollectorConfigurationActions.CURRENT_CASE_GET_CASE_CONFIG_BY_ID_AJAX_TRIO, { configuration });
        // Race condition fix here to grab summaries to attach to collectors.
        console.log(configuration);
        this.getCaseEstimatesByCaseId(caseID);
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CollectorConfigurationActions.CURRENT_CASE_GET_CASE_CONFIG_BY_ID_AJAX_TRIO, error));
  }

  /**
   * Get the user case information
   * @param caseID - integer value referring to the case ID
   */
  getCurrentCase(caseID: number) {
    return this._collectorConfigService.getCaseById(caseID)
      .then((singleCase) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CollectorConfigurationActions.CURRENT_CASE_GET_CASE_BY_ID_AJAX_TRIO, { singleCase });
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CollectorConfigurationActions.CURRENT_CASE_GET_CASE_BY_ID_AJAX_TRIO, error));
  }

  /**
   * Clear collectors from state
   * @param none
   * @memberOf CollectorConfigurationActions
   */
  clearCaseCollectors() {
    this._ngRedux.dispatch({
      type: CollectorConfigurationActions.CASE_COLLECTORS_CLEAR,
      payload: null
    });
  }

    /**
   * Get's all estimate summary's based on case id
   * @param caseID - number
   * @memberOf CollectorConfigurationActions
   */
  getCaseEstimatesByCaseId(caseID: number) {
    this._collectorConfigService.getCurrentCaseEstimates(caseID)
      .then((summaries) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux,
          CollectorConfigurationActions.CASE_CONFIG_GET_ALL_SUMMARY_ESTIMATES_AJAX_TRIO, { summaries });
      });
  }

  createNewFatCCase(newCaseName: ICaseDTO) {
    this._collectorConfigService.createNewCase(newCaseName)
      .then((newlyCreatedCase: ICaseDTO) => AjaxTrio.dispatchSuccessAction(
        this._ngRedux, CollectorConfigurationActions.CASE_CREATE_BY_ID_AJAX_TRIO, { newlyCreatedCase }
      ))
      .catch(error =>
        AjaxTrio.dispatchErrorAction(this._ngRedux, CollectorConfigurationActions.CASE_CREATE_BY_ID_AJAX_TRIO, error));
  }

  /**
   * Update an existing case configuration
   * @param {ICaseConfig} caseConfig
   * @memberOf CollectorConfigurationActions
   */
  updateCaseConfiguration(caseConfig: ICaseConfig): Promise<any> {
    return this._collectorConfigService.updateCaseConfiguration(caseConfig)
      .then((updated: ICaseConfig) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CollectorConfigurationActions.CASE_CONFIG_UPDATE_AJAX_TRIO, { updated });
        // ferry the updated response to anyone downstream interested
        return Promise.resolve(updated);
      }).then(() => {
        this.getCaseEstimatesByCaseId(caseConfig.case.id);
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CollectorConfigurationActions.CASE_CONFIG_UPDATE_AJAX_TRIO, error));
  }

  /**
   * Add a collector to the current case
   * @param {ICollectorConfiguration} collectorConfiguration
   * @memberOf CollectorConfigurationActions
   */
  addCollectorConfiguration(collectorConfiguration: ICollectorConfiguration, curConfig: ICaseConfig): void {
    this._ngRedux.dispatch({
      type: CollectorConfigurationActions.CASE_COLLECTOR_CONFIGURATION_ADD,
      payload: { collectorConfiguration, curConfig }
    });

  }

  /**
   * delete collector
   * @param {collectorId} collectorId
   * @memberOf CollectorConfigurationActions
   */
  deleteCollector(collectorID: number): void {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      CollectorConfigurationActions.CASE_DELETE_COLLECTOR_AJAX_TRIO);

    this._collectorConfigService.deleteCollector(collectorID)
      .then(() => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CollectorConfigurationActions.CASE_DELETE_COLLECTOR_AJAX_TRIO, {
          collectorID
        });
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CollectorConfigurationActions.CASE_DELETE_COLLECTOR_AJAX_TRIO, error));
  }

  /**
   * Add all collectors
   * @param none
   * @memberOf CollectorConfigurationActions
   */
  AddAllCollectors(allAvailableCollectors: ICollectorTypes[]): void {
    this._ngRedux.dispatch({
      type: CollectorConfigurationActions.CASE_CONFIG_ADD_ALL_COLLECTORS_AJAX_TRIO,
      payload: allAvailableCollectors
    });
  }

  runCollectorsInOptions(option: boolean): void {
    this._ngRedux.dispatch({
      type: CollectorConfigurationActions.RUN_COLLECTORS_IN_OPTION,
      payload: option
    });
  }

  /**
   * Update the collector for the case config
   * @param {ICollectorConfiguration} collectorConfiguration
   * @memberOf CollectorConfigurationActions
   * */
  updateCollectorConfigurationAlias(configID: number, newAlias: string): void {
    this._ngRedux.dispatch({
      type: CollectorConfigurationActions.CASE_COLLECTOR_CONFIGURATION_UPDATE_ALIAS,
      payload: { configID, newAlias }
    });
  }

  updateCollectorConfigurationCollectorType(configID: number, typeName: string): void {
    this._ngRedux.dispatch({
      type: CollectorConfigurationActions.CASE_COLLECTOR_CONFIGURATION_UPDATE_COLLECTOR_TYPE,
      payload: { configID, typeName }
    });
  }

/**
   * Update the case information
   * @param {ICaseDTO} updatedCase
   * @memberOf CollectorConfigurationActions
   * */
  updateCase(updatedCase: ICaseDTO): void {
    this._ngRedux.dispatch({
      type: CollectorConfigurationActions.CASE_UPDATE,
      payload: updatedCase
    });
  }

  /**
   * getCollectionEstimate gets the acquisition summary for a given collection config id
   */
  getCollectionEstimate(caseId: number, configID: number) {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      CollectorConfigurationActions.CASE_CONFIG_GET_ESTIMATE_AJAX_TRIO);

    this._collectorConfigService.getCollectionEstimate(configID)
      .then((estimate) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, CollectorConfigurationActions.CASE_CONFIG_GET_ESTIMATE_AJAX_TRIO, {
          configID,
          estimate
        });
        this.getCaseEstimatesByCaseId(caseId);
      })
      .catch(error => AjaxTrio.dispatchErrorAction(this._ngRedux, CollectorConfigurationActions.CASE_CONFIG_GET_ESTIMATE_AJAX_TRIO, error));
  }

  getAvailableCollectorTypes() {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(),
      this._ngRedux, CollectorConfigurationActions.CASE_CONFIG_GET_ALL_COLLECTOR_TYPES_AJAX_TRIO);

    return this._collectorConfigService.getAvailableCollectors()
      .then(collectors => {
        // dont send collectors directly as payload, since this helper puts alert on the payload,
        // that forces javascript to type the array out to a keyed object
        AjaxTrio.dispatchSuccessAction(this._ngRedux,
          CollectorConfigurationActions.CASE_CONFIG_GET_ALL_COLLECTOR_TYPES_AJAX_TRIO, { collectors });
      })
      .catch(err => AjaxTrio.dispatchErrorAction(this._ngRedux,
        CollectorConfigurationActions.CASE_CONFIG_GET_ALL_COLLECTOR_TYPES_AJAX_TRIO, err));
  }

  // having typed promise breaks the entire site. very cool
  getAuthURL(collectorName: string) { //: Promise<ICollectorAuthRequest> {
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(),
      this._ngRedux, CollectorConfigurationActions.CASE_CONFIG_GET_AUTH_URL_AJAX_TRIO);

    return this._collectorConfigService.getAuthURL(collectorName)
      .then(authRequest => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux,
          CollectorConfigurationActions.CASE_CONFIG_GET_AUTH_URL_AJAX_TRIO, { authRequest });
        return authRequest;
      })
      .catch(err => AjaxTrio.dispatchErrorAction(this._ngRedux,
        CollectorConfigurationActions.CASE_CONFIG_GET_AUTH_URL_AJAX_TRIO, err));
  }

    /**
   * Get all cases for the user
   */

  getUserCases() {
    this._collectorConfigService.getCurrentCases()
      .then((allCurrentCases) => AjaxTrio.dispatchSuccessAction(this._ngRedux, CollectorConfigurationActions.CASE_GET_ALL_AJAX_TRIO, { allCurrentCases }))
      .catch(error => {
        //TODO
        // Need to set up an error message that will tell if user has a case or not, create if not. Unauth needs to catch still as error.
        if( error.statusText ===  "Unauthorized") {
          console.log(error.statusText)
          this._ngRedux.dispatch({
            type: CollectorConfigurationActions.NEW_USER_CHECK,
            payload: {newUser : "newUser"}
          });
        } else {
        AjaxTrio.dispatchErrorAction(this._ngRedux, CollectorConfigurationActions.CASE_GET_ALL_AJAX_TRIO, error);}
      });
  }

}
