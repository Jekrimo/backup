import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { buildURL } from "../../shared/util.web-api";
import { ILoginUserDTO } from "./login.DTO";

@Injectable()
export class LoginService {
  constructor(private _http: Http,
    private _router: Router) {
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  postCurrentUser(UserLoginInfo: ILoginUserDTO): Promise<any> {
    const url = buildURL(`api/login`);
    return this._http.post(url, UserLoginInfo, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  logOutCurrentUser(): Promise<any> {
    const url = buildURL(`api/logout`);
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  checkIsAdmin(): Promise<any> {
    const url = buildURL(`api/isadmin`);
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  checkIsAuthorized(): Promise<any> {
    const url = buildURL(`api/checkAuth`);
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  checkUserAuthToken(authChecks: Object): Promise<any> {
    const url = buildURL(`api/checkUserAuth`);
    return this._http.post(url, authChecks, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * User change Password
   * @param { "password": "newPassword" }
   */
  userChangePassword(newPassword: Object): Promise<any> {
    const url = buildURL(`api/changePassword`);
    return this._http.put(url, newPassword, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * Get user
   * @param UserId
   */
  getUserConfig(id: number) {
    const url = buildURL(`api/user/${id}`);
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }
   /**
   * trys to get stored session
   * @param sessionID stored session id to try to restore
   */
  getCookieSession(sessionID: string) {
    const url = buildURL(`api/session/${sessionID}`);
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }

}
