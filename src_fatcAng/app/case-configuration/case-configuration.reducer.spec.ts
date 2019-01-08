import { INITIAL_STATE } from "../shared/initial-state";
import { IAction } from "../store";
import { currentCaseReducer } from "./case-configuration.reducer";
import { ICaseConfig } from "../shared/data.dto";
import { CaseConfigurationActions } from "./case-configuration.actions";
import * as R from "ramda";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
describe("Case config - current case reducer", () => {

  it("should return correct initial state", () => {
    const expected = INITIAL_STATE.currentCase;
    const dummyAction: IAction = { type: "foo" };
    const newState = currentCaseReducer(expected, dummyAction);
    expect(newState).toEqual(expected);
  });

  const testCaseConfig: ICaseConfig = {
    case: null,
    configurations: [
      {
        collectorTypeName: "foobook",
        caseID: 1,
        collectorAlias: "a",
        desiredChunkSize: 1,
        hasAuthorization: false,
        id: 1,
        indexNumber: 0,
        summary: null
      }]
  };

  it("should update a collector alias", () => {
    const newAlias = "a555";
    const payload = {
      configID: 1,
      newAlias
    };
    const action: IAction = { type: CaseConfigurationActions.CASE_COLLECTOR_CONFIGURATION_UPDATE_ALIAS, payload };
    const newState = currentCaseReducer(testCaseConfig, action);
    expect(newState.configurations.length).toEqual(1);
    expect(newState.configurations[0].collectorAlias).toEqual(newAlias);
  });

  it("should update a collector type", () => {
    const typeName = "myface";
    const payload = {
      configID: 1,
      typeName
    };
    const action: IAction = { type: CaseConfigurationActions.CASE_COLLECTOR_CONFIGURATION_UPDATE_COLLECTOR_TYPE, payload };
    const newState = currentCaseReducer(testCaseConfig, action);
    expect(newState.configurations.length).toEqual(1);
    expect(newState.configurations[0].collectorTypeName).toEqual(typeName);
  });


  // this one will actually need re-rit because logic order has changed with the saving of estimates.
  // it("should get collector estimate data", () => {
  //   const summary: any = {
  //     "id": 0,
  //       "caseId": 0,
  //       "collectorId": 1,
  //     collectorSummary: {
  //       "collectorSummary": {}
  //     },
  //     retrievedAt: new Date()
  //   };
  //   const payload = {
  //     configID: 1,
  //     estimate: summary
  //   };
  //   const action: IAction = {type: CaseConfigurationActions.CASE_CONFIG_GET_ESTIMATE_AJAX_TRIO.SUCCESS, payload};
  //   const newState = currentCaseReducer(testCaseConfig, action);
  //   expect(newState.configurations.length).toEqual(1);
  //   expect(newState.configurations[0].summary).toEqual(summary);
  // });

  it("should update collector auth", () => {
    const updatedCfg = R.clone(testCaseConfig.configurations[0]);
    updatedCfg.hasAuthorization = true;

    const payload = {
      cfgIndex: 0,
      persist: updatedCfg,
    };

    const action: IAction = { type: CaseConfigurationActions.CASE_CONFIG_SET_AUTH_CODE_AJAX_TRIO.SUCCESS, payload };
    const newState = currentCaseReducer(testCaseConfig, action);
    expect(newState.configurations[0].hasAuthorization).toEqual(updatedCfg.hasAuthorization);
  });

  it("should add a collector config", () => {
    const newConfig = R.clone(testCaseConfig.configurations[0]);
    newConfig.collectorAlias = "foobook2";

    const payload = {
      collectorConfiguration: newConfig
    };

    const action: IAction = { type: CaseConfigurationActions.CASE_COLLECTOR_CONFIGURATION_ADD, payload };
    const newState = currentCaseReducer(testCaseConfig, action);
    expect(newState.configurations).toContain(newConfig);
  });
});
