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
export class AdminService {
  constructor(private _http: Http,
    private _router: Router) {
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  /**
   * Get all users
   */

  getAllCurrentUsers() {
    const url = buildURL(`api/admin/users`);
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * Get user
   * @param UserId
   */
  getUser(id: number) {
    const url = buildURL(`api/admin/user/${id}`);
    return this._http.get(url, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * Create a new user
   * @param IUserDTO
   */

  createNewUser(userInfo: IUserDTO): Promise<any> {
    const url = buildURL(`api/admin/user/create`);
    return this._http.post(url, userInfo, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * Change a users password
   * @param userUpdatedPassword - {username: string, newPassword: string}
   */

  changeUserPassword(userUpdatedPassword: Object): Promise<any> {
    const url = buildURL(`api/admin/user/setpassword`);
    return this._http.post(url, userUpdatedPassword, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }


  /**
   * Delete user
   * @param userId - users Id
   */

  deleteUser(userId: number): Promise<any> {
    const url = buildURL(`api/admin/user/delete/${userId}`);
    return this._http.delete(url, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * Update user
   * @param UserInfo - IUserDTO
   */

  updateUser(UserInfo: IUserDTO): Promise<any> {
    const url = buildURL(`api/admin/user/update`);
    return this._http.put(url, UserInfo, { withCredentials: true })
      .map((response: Response) => <any>response.json())
      .toPromise()
      .catch(this.handleError);
  }
}
