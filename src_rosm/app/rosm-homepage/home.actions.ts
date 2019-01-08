import {Injectable} from '@angular/core';
import {AjaxTrio} from '../Shared/ajaxTrio.class';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../store';

@Injectable()
export class HomeActions {
  static HOME_ACTION_AJAX_TRIO = new AjaxTrio(
    'LOGIN_TO_FATC_AJAX_TRIO',
    'sending information...',
    'Welcome',
    'error'
  );

  constructor(private _ngRedux: NgRedux<IAppState>) {
  }

  // send test state check
  testRedux(message: string) {
    this._ngRedux.dispatch({
      type: HomeActions.HOME_ACTION_AJAX_TRIO,
      payload: message
    });
  }
}
