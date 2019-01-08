import {NgRedux} from "@angular-redux/store";
import * as R from "ramda";
import {IAppState} from "../state/store";
import {Alert, AlertType} from "../components/alerts/alert.class";

/**
 * Helper class to manage the 3 possible phases of an ajax request:
 * 1. the request has been made
 * 2. the request returned successfully
 * 3. the request failed and returned an error
 */
export class AjaxTrio {

  // the action type
  // (e.g., 'LOAD_SAILORS')
  private _actionType: string;
  get actionType(): string {
    return this._actionType;
  }

  // the action type string to indicate that the request has been made
  // (e.g., 'LOAD_SAILORS_REQUEST')
  private _REQUEST: string;
  get REQUEST(): string {
    return this._REQUEST;
  }

  // the action type string to indicate that the request returned successfully
  // (e.g., 'LOAD_SAILORS_SUCCESS')
  private _SUCCESS: string;
  get SUCCESS(): string {
    return this._SUCCESS;
  }

  // the action type string to indicate that the request failed
  // (e.g., 'LOAD_SAILORS_ERROR')
  private _ERROR: string;
  get ERROR(): string {
    return this._ERROR;
  }

  // message to display when the request is started
  // (e.g., 'Loading sailors...')
  private _requestMessage: string;
  get requestMessage(): string {
    return this._requestMessage;
  }

  // message to display when the request returns successfully
  // (e.g., 'Successfully loaded sailors')
  private _successMessage: string;
  get successMessage(): string {
    return this._successMessage;
  }

  // message to display when the request fails
  // (e.g., 'Could not load sailors')
  private _errorMessage: string;
  get errorMessage(): string {
    return this._errorMessage;
  }

  /**
   * Dispatches a web-service request
   * @param state Redux state
   * @param dispatch Redux store dispatch function
   * @param ajaxTrio
   * @returns {boolean}
   */
  static dispatchRequestAction(state: IAppState, ngRedux: NgRedux<IAppState>, ajaxTrio: AjaxTrio): boolean {

    // if there is already a pending request, don't re-request
    const isSameActionType: (a: Alert) => boolean = (a: Alert) => a.id === ajaxTrio.actionType;
    const isInfoAlert: (a: Alert) => boolean = (a: Alert) => a.type === AlertType.info;
    const alertAlreadyExists: (a: Alert) => boolean = (a: Alert) => isSameActionType(a) && isInfoAlert(a);
    if (R.any(alertAlreadyExists)(state.alerts)) {
      return false;
    }

    ngRedux.dispatch({
      type: ajaxTrio.REQUEST,
      payload: {
        alert: new Alert(ajaxTrio.actionType, AlertType.info, ajaxTrio.requestMessage)
      }
    });

    return true;
  }

  /**
   * Dispatches a successful return from a web-service request
   * @param dispatch Redux store dispatch function
   * @param ajaxTrio
   * @param payload Payload to send, usually data from server
   * @param announce Whether or not the success alert announces its success
   */
  static dispatchSuccessAction(ngRedux: NgRedux<IAppState>, ajaxTrio: AjaxTrio,
                               payload: any, type: AlertType = AlertType.success_quiet): void {
    ngRedux.dispatch({
      type: ajaxTrio.SUCCESS,
      payload: R.merge({
        alert: new Alert(ajaxTrio.actionType, type, ajaxTrio.successMessage)
      }, payload)
    });
  }

  /**
   * Dispatches an error returned from a web-service request
   * @param dispatch Redux store dispatch function
   * @param ajaxTrio
   * @param err Additional error message from server (i.e., details of the failure beyond 'Could not load sailors')
   */
  static dispatchErrorAction(ngRedux: NgRedux<IAppState>, ajaxTrio: AjaxTrio, err: string): void {
    ngRedux.dispatch({
      type: ajaxTrio.ERROR,
      payload: {
        alert: new Alert(ajaxTrio.actionType, AlertType.error, `${ajaxTrio.errorMessage} ${err}`)
      }
    });
  }

  /**
   * Constructor
   * @param actionType The action type (e.g., 'LOAD_SAILORS')
   * @param requestMessage Message to display when the request is made (e.g., 'Loading sailors...')
   * @param successMessage Message to display when the request returns successfully (e.g., 'Successfully loaded sailors')
   * @param errorMessage Message to display when the request fails (e.g., 'Could not get sailors')
   */
  constructor(actionType: string, requestMessage: string, successMessage: string, errorMessage: string) {

    this._actionType = actionType;
    this._requestMessage = requestMessage;
    this._successMessage = successMessage;
    this._errorMessage = errorMessage;

    // capitalize actionType
    const PREFIX: string = actionType.toUpperCase();

    // create the REQUEST, SUCCESS, and ERROR action type strings
    this._REQUEST = `${PREFIX}_REQUEST`;
    this._SUCCESS = `${PREFIX}_SUCCESS`;
    this._ERROR = `${PREFIX}_ERROR`;
  }
}
