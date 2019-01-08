// import {HomeActions} from '../rosm-homepage/home.actions';
import {INITIAL_STATE} from '../Shared/initial-state';
import {IAction} from '../store';
import {UserActions} from './users.actions';

export const UsersReducer = (state = INITIAL_STATE, action: IAction): any => {
  switch (action.type) {
    default:
      return state;
  }
};
