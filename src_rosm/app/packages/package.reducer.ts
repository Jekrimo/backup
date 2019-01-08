import {HomeActions} from '../rosm-homepage/home.actions';
import {INITIAL_STATE} from '../Shared/initial-state';
import {IAction} from '../store';
import {RegistryPackageActions} from './package.actions';

export const PackageReducer = (state = INITIAL_STATE, action: IAction): any => {
  switch (action.type) {
    case HomeActions.HOME_ACTION_AJAX_TRIO.SUCCESS:
      return action.payload;
    case RegistryPackageActions.CREATE_NEW_PACKAGE_AJAX_TRIO.SUCCESS:
      return action.payload.success;
    case RegistryPackageActions.GET_ALL_PACKAGES_AJAX_TRIO.SUCCESS:
      return action.payload;
    case RegistryPackageActions.GET_PACKAGE_BY_ID_AJAX_TRIO.SUCCESS:
      return {currentPackage : action.payload};
    default:
      return state;
  }
};

