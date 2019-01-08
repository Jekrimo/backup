import {
  combineReducers
} from 'redux';
import {IAction} from '../store';

import {INITIAL_STATE} from '../Shared/initial-state';
import {RegistryPackageActions} from '../rosm-registry-homepage/registry-homepage.actions';

// actions.js
export const activateGeod = geod => ({
  type: 'ACTIVATE_GEOD',
  geod,
});

export const closeGeod = () => ({
  type: 'CLOSE_GEOD',
});

// reducers.js
export const geod = (state = {}, action) => {
  switch (action.type) {
    case 'ACTIVATE_GEOD':
      return action.geod;
    case 'CLOSE_GEOD':
      return {};
    default:
      return state;
  }
};

export const testReducer = (state = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case RegistryPackageActions.GET_ALL_PACKAGES_AJAX_TRIO.SUCCESS:
      return action.payload;
    default:
      return state;
  }
};



