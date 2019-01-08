import {find, propEq} from "ramda";
import * as R from "ramda";
import { CollectorConfigurationActions } from "./collector-config.actions";
import { IAction } from "../../state/store";
import {
  ICaseConfig,
  ICollectionSummary,
  ICollectorAuthRequest,
  ICollectorConfiguration,
  ICollectorTypes,

} from "../../shared/data.dto";
import { INITIAL_STATE } from "../../shared/initial-state";
import { combineReducers } from "redux";

declare const FB: any;

/**
 * Queued collectors are collectors marked to be run in run page
 */
export const queuedCollectorReducer = (state: ICollectorConfiguration[] = INITIAL_STATE.queuedCollectors,
  action: IAction): ICollectorConfiguration[] => {
  switch (action.type) {
    case CollectorConfigurationActions.RUN_COLLECTORS_IN_OPTION:
      return action.payload;
    case CollectorConfigurationActions.CASE_COLLECTOR_CONFIGURATION_SELECT:
      return action.payload;
    default:
      return state;
  }
};
export const nothingReducer = (state = INITIAL_STATE, action: IAction): any =>  {
  switch (action.type) {
    case CollectorConfigurationActions.NEW_USER_CHECK:
      return action.payload;
    default:
      return state;
  }
};

export const emptyCaseReducer = (state = INITIAL_STATE.currentCase, action: IAction): any => {
  switch (action.type) {
    case CollectorConfigurationActions.CASE_CREATE_BY_ID_AJAX_TRIO.SUCCESS:
    console.log(action.payload.newlyCreatedCase)
      return  action.payload.newlyCreatedCase;
    case CollectorConfigurationActions.CURRENT_CASE_GET_CASE_BY_ID_AJAX_TRIO.SUCCESS:
      return R.merge(state, {case: action.payload.singleCase});
    case CollectorConfigurationActions.CURRENT_CASE_GET_CASE_CONFIG_BY_ID_AJAX_TRIO.SUCCESS:
      if (action.payload.configuration === null) {
        return state;
      }
      return R.merge(state, {configurations: action.payload.configuration});
    case CollectorConfigurationActions.CASE_CONFIG_GET_ALL_SUMMARY_ESTIMATES_AJAX_TRIO.SUCCESS:
      if (true) {
        // server can return null if there are no summaries
        if (!action.payload.summaries) {
          return state;
        }
        const allEstimates = state.configurations.filter((x: any) => {
          return action.payload.summaries.filter((c: any) => {
              if (x.id === c.collectorID) {
                return x.summary = c.collectorSummary;
              } else {
                return x;
              }
            }
          );
        });
        return R.merge(state, {configurations: allEstimates});
      }

    case CollectorConfigurationActions.CASE_DELETE_COLLECTOR_AJAX_TRIO.SUCCESS:
      return R.merge(state, {configurations: (state.configurations.filter(collector => collector.id !== action.payload.collectorID))});
    case CollectorConfigurationActions.CASE_CONFIG_CREATE_AND_AUTH_AJAX_TRIO.SUCCESS:
      if (state.configurations !== null) {
        const newStatewithCollector = state.configurations.push(action.payload.createdCollector)
        return R.merge(state, newStatewithCollector);
      } else {
        return R.merge(state, {configurations: [action.payload.createdCollector]})
      }

    case CollectorConfigurationActions.CASE_GET_ALL_AJAX_TRIO.SUCCESS:
      return action.payload.allCurrentCases;
    default:
      return state;
  }
}
/**
 * Collector types
 */
export const collectorTypesReducer = (state: ICollectorTypes[] = INITIAL_STATE.collectorTypes, action: IAction): ICollectorTypes[] => {
  switch (action.type) {
    case CollectorConfigurationActions.CASE_CONFIG_GET_ALL_COLLECTOR_TYPES_AJAX_TRIO.SUCCESS:
      const collectors = action.payload.collectors;
      // const fbCollector = find(propEq("name", "Facebook"), collectors);
      // if (fbCollector) {
      //   FB.init({
      //     appId: fbCollector.appID,
      //     cookie: true,
      //     xfbml: false,
      //     status: false,
      //     autoLogAppEvents: false,
      //     version: "v2.9"
      //   });
      // }
      return collectors;

    default:
      return state;
  }


};

/**
 * Combine the reducers
 */
export const collectorReducer = combineReducers<any>({
  newUser: nothingReducer,
  case: emptyCaseReducer,
  queuedCollectors: queuedCollectorReducer,
  collectorTypes: collectorTypesReducer,
});
