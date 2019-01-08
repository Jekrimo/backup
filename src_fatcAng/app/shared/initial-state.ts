import {
  ICasesState
} from "./data.dto";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
/**
 * Initial state for entire UI
 */
export const INITIAL_STATE: ICasesState = {
  cases: [],
  currentCase: null,
  users: null,
  selectedCollectorIndex: -1,
  queuedCollectors: [],
  collectorTypes: [],
  tempCollector: null,
};
