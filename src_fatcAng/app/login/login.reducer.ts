import { IAction } from "../store";
import { LoginActions } from "./login.actions";
import { ILoginState, INITIAL_STATE } from "./login.models";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
export const loginReducer = (state = INITIAL_STATE, action: IAction): ILoginState => {
  switch (action.type) {
    case LoginActions.LOGIN_TO_FATC_AJAX_TRIO.SUCCESS:
      return action.payload.loginInfo;
    case LoginActions.GET_USER_FROM_COOKIE_AJAX_TRIO.SUCCESS:
      return action.payload.loginInfo;
    case LoginActions.LOGOUT_OF_FATC_AJAX_TRIO.SUCCESS:
      return INITIAL_STATE;
    case LoginActions.CHANGE_USER_PASSWORD_BY_USER_AJAX_TRIO.SUCCESS:
      return state;
    case LoginActions.CHECK_USER_AUTH_AJAX_TRIO.SUCCESS:
      return action.payload.loginInfo;
    default:
      return state;
  }
};
