import {Injectable} from '@angular/core';
import {AjaxTrio} from '../Shared/ajaxTrio.class';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../store';

@Injectable()
export class RegistryPackageActions {
  static GET_ALL_PACKAGES_AJAX_TRIO = new AjaxTrio(
    'GET_ALL_PACKAGES_AJAX_TRIO',
    'trying to get all packages...',
    'Successfully got all packages!',
    'error getting all packages'
  );

  constructor(private _ngRedux: NgRedux<IAppState>) {
  }

  // send test state check
  packageActions(message: string) {
    // this._ngRedux.dispatch({
    //   type: RegistryPackageActions.GET_ALL_PACKAGES_AJAX_TRIO,
    //   payload: message
    // });
  }
}
