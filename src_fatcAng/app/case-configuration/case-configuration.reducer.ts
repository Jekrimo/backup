import {find, propEq} from "ramda";
import { CaseConfigurationActions } from "./case-configuration.actions";
import { IAction } from "../store";
import {
  ICaseConfig,
  ICollectionSummary, ICollectorAuthRequest,
  ICollectorConfiguration,
  ICollectorTypes,
} from "../shared/data.dto";
import { INITIAL_STATE } from "../shared/initial-state";
declare const FB: any;
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
/**
 * Current case is based off the id passed in from the route
 */

/**
 * Selected collector in the case config page
 */
export const selectedCollectorReducer = (state: number = INITIAL_STATE.selectedCollectorIndex,
  action: IAction): number => {
  switch (action.type) {
    case CaseConfigurationActions.CASE_COLLECTOR_CONFIGURATION_ADD:
      // payload will be all the local state collector configs and the new one
      // so just set selected index to length of current configs so the new one pops selected
      if (!action.payload.curConfig || !(<ICaseConfig>action.payload.curConfig).configurations) {
        return 0;
      }
      return (<ICaseConfig>action.payload.curConfig).configurations.length;
    default:
      return state;
  }
};
/**
 * Queued collectors are collectors marked to be run in run page
 */
export const queuedCollectorReducer = (state: ICollectorConfiguration[] = INITIAL_STATE.queuedCollectors,
  action: IAction): ICollectorConfiguration[] => {
  switch (action.type) {
    case CaseConfigurationActions.RUN_COLLECTORS_IN_OPTION:
      return action.payload;
    case CaseConfigurationActions.CASE_COLLECTOR_CONFIGURATION_SELECT:
      return action.payload;
    default:
      return state;
  }
};
/**
 * Collector types
 */
export const collectorTypesReducer = (state: ICollectorTypes[] = INITIAL_STATE.collectorTypes, action: IAction): ICollectorTypes[] => {
  switch (action.type) {
    case CaseConfigurationActions.CASE_CONFIG_GET_ALL_COLLECTOR_TYPES_AJAX_TRIO.SUCCESS:
      const collectors = action.payload.collectors;
      const fbCollector = find(propEq("name", "Facebook"), collectors);
      if (fbCollector) {
        FB.init({
          appId: fbCollector.appID,
          cookie: true,
          xfbml: false,
          status: false,
          autoLogAppEvents: false,
          version: "v2.9"
        });
      }
      return collectors;
    default:
      return state;
  }
};
