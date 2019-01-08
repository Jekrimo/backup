import {
  ICasesState
} from "./data.dto";
/**
 * Initial state for entire UI
 */
export const INITIAL_STATE: ICasesState = {
  cases: [],
  currentCase: null,
  users: null,
  queuedCollectors: [],
  collectorTypes: [],
  tempCollector: null,
};
