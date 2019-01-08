import {Injectable} from '@angular/core';
import {AjaxTrio} from '../Shared/ajaxTrio.class';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../store';
import {IUserLoginCreds} from '../Shared/data.dto';
import {UserServices} from './users.service';
import {Router} from '@angular/router';

@Injectable()
export class UserActions {

  static GET_ALL_USERS_AJAX_TRIO = new AjaxTrio(
    'GET_ALL_USERS_AJAX_TRIO',
    'trying to get all users...',
    'Successfully got all users!',
    'error getting all users'
  );

  static LOGIN_USER_AJAX_TRIO = new AjaxTrio(
    'LOGIN_USER_AJAX_TRIO',
    'trying to login user...',
    'Successfully logged in user!',
    'error logging in, please check username and/or password.'
  );


  constructor(private _ngRedux: NgRedux<IAppState>,
              private Route: Router,
              private _userservices: UserServices
  ) {

  }

  // Retrieve all users, will need an admin check in here, prob just need to ask server to check tokena dn find user.
//   getAllUsersAction() {
//     AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
//       RegistryPackageActions.GET_ALL_USERS_AJAX_TRIO);
//
//     this._users.getAllUsers()
//       .then((allPackages) => {
//         AjaxTrio.dispatchSuccessAction(this._ngRedux, RegistryPackageActions.GET_ALL_USERS_AJAX_TRIO, { allPackages });
//       })
//       .catch(error => {
//         AjaxTrio.dispatchErrorAction(this._ngRedux, RegistryPackageActions.GET_ALL_USERS_AJAX_TRIO, error);
//       });
//   }
//
  loginUserAction(message: IUserLoginCreds): Promise<any> {
    console.log(message);
    AjaxTrio.dispatchRequestAction(this._ngRedux.getState(), this._ngRedux,
      UserActions.LOGIN_USER_AJAX_TRIO);

    return this._userservices.loginUserService(message)
      .then((success) => {
        AjaxTrio.dispatchSuccessAction(this._ngRedux, UserActions.LOGIN_USER_AJAX_TRIO, { success });
        return true;
      })
      .catch(error => {
        AjaxTrio.dispatchErrorAction(this._ngRedux, UserActions.LOGIN_USER_AJAX_TRIO, error);
        return false;
      });
  }
}
