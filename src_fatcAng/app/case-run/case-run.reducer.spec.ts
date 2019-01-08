import { INITIAL_STATE } from "../shared/initial-state";
import { IAction } from "../store";
import { runCollectorsReducer } from "./case-run.reducer";
import { CasesRunCollectorsActions } from "./case-run.actions";

///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
describe("Case run reducer", () => {
  // TODO
  it("should return correct initial state", () => {
    const expected = INITIAL_STATE.tempCollector;
    const dummyAction: IAction = { type: "foo" };
    const newState = runCollectorsReducer(expected, dummyAction);
    expect(newState).toEqual(expected);
  });

  it("Put whatever is returned onto state", () => {
    const newAlias = {};
    // const payload = {
    //   tempCollector: "someCollector"
    // };
    const action: IAction = {
      type: CasesRunCollectorsActions.CASE_RUN_COLLECTOR_SERIES_AJAX_TRIO.SUCCESS,
      payload: {}
    };
    const newState = runCollectorsReducer(INITIAL_STATE.tempCollector, action);
    expect(newState).toEqual(newAlias);
  });

});
