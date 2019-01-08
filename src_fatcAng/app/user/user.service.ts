import { IUserDTO } from "../shared/data.dto";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { buildURL } from "../shared/util.web-api";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////

@Injectable()
export class UserService {
  constructor(private _http: Http,
    private _router: Router) {
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  /**
   * Change a users password
   */

  changeUserPassword(userUpdatedPassword: Object): Promise<any> {
    const url = buildURL(`api/user/changePassword`);
    return this._http.post(url, userUpdatedPassword, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  updateUserInformation(UserInfo: IUserDTO): Promise<any> {
    const url = buildURL(`api/user/updateSelf`);
    return this._http.put(url, UserInfo, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }
}
