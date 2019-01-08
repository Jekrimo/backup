import { INITIAL_STATE } from "../shared/initial-state";
import { casesReducer } from "./cases.reducer";
import { IAction } from "../store";
import { CasesActions } from "./cases.actions";
import { ICaseDTO } from "../shared/data.dto";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
describe("Cases reducer", () => {
  it("should return initial state correctly", () => {
    const dummyAction: IAction = { type: "foo" };
    const newState = casesReducer(INITIAL_STATE.cases, dummyAction);
    expect(newState).toEqual(INITIAL_STATE.cases);
  });

  it("should update retrieved cases", () => {
    const newCases: ICaseDTO[] = [{
      caseNumber: "cn",
      evidenceNumber: "en",
      examinerName: "exn",
      description: "d",
      id: 1,
      ownerID: 1
    }];
    const action: IAction = { type: CasesActions.CASE_GET_ALL_AJAX_TRIO.SUCCESS, payload: { allCurrentCases: newCases } };
    const newState = casesReducer(INITIAL_STATE.cases, action);
    expect(newState).toEqual(newCases);
  });

  it("should create new case by id", () => {
    const newCase: ICaseDTO = {
      caseNumber: "cn",
      evidenceNumber: "en",
      examinerName: "exn",
      description: "d",
      id: 1,
      ownerID: 1
    };
    const action: IAction = { type: CasesActions.CASE_CREATE_BY_ID_AJAX_TRIO.SUCCESS, payload: { newlyCreatedCase: newCase } };
    const newState = casesReducer(INITIAL_STATE.cases, action);
    expect(newState).toContain(newCase);
  });
});
