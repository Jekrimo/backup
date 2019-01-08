import { UserActions } from "../user/user.actions";
import { combineReducers } from "redux";
import { IAction } from "../store";
import { AdminActions } from "./admin.actions";
import { LoginActions } from "../login/login.actions";
import { IUserDTO } from "../shared/data.dto";
import {merge} from "ramda";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
export const INITIAL_STATE: Array<any> = [];


// editUserObjectReducer handles the search for finding user that is being edited and returning the correct placement
// of users new info.
const editUserObjectReducer = (state: IUserDTO, action: IAction) => {
  switch (action.type) {
    case AdminActions.UPDATE_USER_AJAX_TRIO.SUCCESS:
      return (state.id === action.payload.UserInfo.id) ? merge(state, action.payload.UserInfo) : state;
    default:
      return state;
  }
};

export const adminReducer = (state: IUserDTO[] = INITIAL_STATE, action: IAction): Array<any> => {
  switch (action.type) {
    case AdminActions.GET_ALL_USERS_AJAX_TRIO.SUCCESS:
      return action.payload.getUserResponse;
    case AdminActions.ADD_NEW_USER_AJAX_TRIO.SUCCESS:
      action.payload.newUserInfo.tempPass = "";
      return [...state, action.payload.newUserInfo];
    case AdminActions.UPDATE_USER_AJAX_TRIO.SUCCESS:
      return state.map(user => editUserObjectReducer(user, action));
    case AdminActions.DELETE_USER_AJAX_TRIO.SUCCESS:
      return state.filter(user => user.id !== action.payload.userId);
    case AdminActions.UPDATE_USER_PASSWORD_AJAX_TRIO.SUCCESS:
      return state;
    default:
      return state;
  }
};

// GET_USER_INFO_LOGGIN is found in loggin actions.
export const currentUserReducer = (state: IUserDTO[] = INITIAL_STATE, action: IAction): IUserDTO[] => {
  switch (action.type) {
    case LoginActions.GET_USER_INFO_LOGIN_AJAX_TRIO.SUCCESS:
      return action.payload.userInformation;
    case UserActions.UPDATE_USERS_SELF_AJAX_TRIO.SUCCESS:
      return action.payload.updateUserInfo;
    case UserActions.UPDATE_USER_SELF_PASSWORD_AJAX_TRIO.SUCCESS:
      return state;
    default:
      return state;
  }
};

export const editUserReducer = (state: Array<any> = INITIAL_STATE, action: IAction): Array<any> => {
  switch (action.type) {
    case AdminActions.GET_USER_AJAX_TRIO.SUCCESS:
      return action.payload.edituserInformation
    case AdminActions.CLEAR_USER_AJAX_TRIO:
      return [{}];
    default:
      return state;
  }
}

// This is simply needed to keep track of what edit/add user modal shows
export const addEditUserModalReducer = (state: any = INITIAL_STATE, action: IAction): any => {
  switch (action.type) {
    case AdminActions.MODAL_STATUS_AJAX_TRIO:
      return action.payload.message;
    default:
      return state;
  }
};


export const usersReducer: any = combineReducers<any>({
  users: adminReducer,
  editUser: editUserReducer,
  currentUser: currentUserReducer,
  modalStatus: addEditUserModalReducer
});
