import * as R from "ramda";
import {IAction} from "../../store";
import {CurrentCaseActions} from "./current-case.actions";
import {INITIAL_STATE} from "../initial-state";
import {ICaseConfig, ICollectionSummary, ICollectorConfiguration} from "../data.dto";
import {CaseConfigurationActions} from "../../case-configuration/case-configuration.actions";

///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////

export const currentCaseReducer = (state: ICaseConfig = INITIAL_STATE.currentCase, action: IAction): ICaseConfig => {
  switch (action.type) {

    case CurrentCaseActions.CURRENT_CASE_GET_CASE_BY_ID_AJAX_TRIO.SUCCESS:
      return R.merge(state, {case: action.payload.singleCase});

    case CaseConfigurationActions.CASE_CONFIG_UPDATE_AJAX_TRIO.SUCCESS:
      return action.payload.updated;

    case CaseConfigurationActions.CASE_CONFIG_CREATE_AND_AUTH_AJAX_TRIO.SUCCESS:
      if (state.configurations !== null) {
        const newStatewithCollector = state.configurations.push(action.payload.createdCollector)
        return R.merge(state, newStatewithCollector);
      } else {
        return R.merge(state, {configurations: [action.payload.createdCollector]})
      }

    case CaseConfigurationActions.CASE_CONFIG_CREATE_AJAX_TRIO.SUCCESS:
      return R.merge(state, action.payload.caseConfiguration);

    case CurrentCaseActions.CURRENT_CASE_GET_CASE_CONFIG_BY_ID_AJAX_TRIO.SUCCESS:
      if (action.payload.configuration === null) {
        return state;
      }

      for (let i = 0; i < action.payload.configuration.length - 1; i++) {
        if (action.payload.configuration[i].indexNumber === action.payload.configuration[i + 1].indexNumber) {
          action.payload.configuration[i].indexNumber = i;
        }
      }

      const sorted = R.sortBy((c: ICollectorConfiguration) => c.indexNumber, action.payload.configuration);
      return R.merge(state, {configurations: sorted});
    // return R.merge(state,
    //   {
    //     configurations: R.sortBy(
    //       // R.prop refuses to work, gets typed any
    //       //R.prop("indexNumber")
    //       c => c.indexNumber,
    //       , <ICollectorConfiguration[]>action.payload.configuration)
    //   });
    case CaseConfigurationActions.CASE_CONFIG_GET_ALL_SUMMARY_ESTIMATES_AJAX_TRIO.SUCCESS:
      if (state.configurations) {
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
      return state;
    case CaseConfigurationActions.CASE_COLLECTOR_CONFIGURATION_ADD:
      if (!state.configurations) {
        return R.merge(state, {configurations: [action.payload.collectorConfiguration]});
      }
      return R.merge(state, {configurations: [...state.configurations, action.payload.collectorConfiguration]});
    case CaseConfigurationActions.CASE_COLLECTORS_CLEAR:
      return R.merge(state, {configurations: null});
    case CaseConfigurationActions.CASE_COLLECTOR_CONFIGURATION_UPDATE_ALIAS:
      return R.merge(state, {
        configurations: R.map((x: ICollectorConfiguration) => {
          if (x.id !== action.payload.configID) {
            return x;
          }
          return R.merge(x, {collectorAlias: action.payload.newAlias});
        }, state.configurations)
      });

    case CaseConfigurationActions.CASE_MOVE_COLLECTOR_UP:
      const configCopy: ICollectorConfiguration[] = R.clone(state.configurations);
      const tempIndexVal = state.configurations[action.payload];
      configCopy[action.payload] = configCopy[action.payload - 1];
      configCopy[action.payload - 1] = tempIndexVal;
      return R.merge(state, {configurations: configCopy});

    case CaseConfigurationActions.CASE_MOVE_COLLECTOR_DOWN:
      const configDownCopy: ICollectorConfiguration[] = R.clone(state.configurations);
      const IndexVal = state.configurations[action.payload];
      configDownCopy[action.payload] = configDownCopy[action.payload + 1];
      configDownCopy[action.payload + 1] = IndexVal;
      return R.merge(state, {configurations: configDownCopy});

    case CaseConfigurationActions.CASE_CONFIG_ADD_ALL_COLLECTORS_AJAX_TRIO.SUCCESS:
      return R.merge(state, {configurations: action.payload.allCollectResponse});

    case CaseConfigurationActions.CASE_COLLECTOR_CONFIGURATION_UPDATE_COLLECTOR_TYPE:
      return R.merge(state, {
        configurations: R.map((x: ICollectorConfiguration) => {
          if (x.id !== action.payload.configID) {
            return x;
          }
          return R.merge(x, {collectorTypeName: action.payload.typeName});
        }, state.configurations)
      });
    /* tslint:enable */
    case CaseConfigurationActions.CASE_CONFIG_GET_ESTIMATE_AJAX_TRIO.SUCCESS:
      return state;
    case CaseConfigurationActions.CASE_DELETE_COLLECTOR_AJAX_TRIO.SUCCESS:
      return R.merge(state, {configurations: (state.configurations.filter(collector => collector.id !== action.payload.collectorID))});
    case CaseConfigurationActions.CASE_CONFIG_SET_AUTH_CODE_AJAX_TRIO.SUCCESS:
      // persist will have updated config with correct auth info in it. if it was brand new, the server already saved it
      // for us. update local state to match
      const newCfgs: ICollectorConfiguration[] = R.clone(state.configurations);
      const collectorSumm: ICollectionSummary = state.configurations[action.payload.newIndex].summary;
      newCfgs[action.payload.newIndex] = action.payload.persist;
      newCfgs[action.payload.newIndex].summary = collectorSumm;
      return R.merge(state, {configurations: newCfgs});
    default:
      return state;
  }
};
