
import { Injectable } from '@angular/core';
import { buildURL } from '../shared/util.web-api';
import {HttpClient} from '@angular/common/http';
import {IUserLoginCreds} from '../Shared/data.dto';

@Injectable()
export class UserServices {

  constructor(private _http: HttpClient, ) {
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  // Service handler to retrieve all packages from server.

  loginUserService(userCreds: IUserLoginCreds): Promise<any> {
    const url = buildURL(`loginUser`);
    // return this.tempPackages
    return this._http.post(url, userCreds, { withCredentials: true })
      .map((response: any) => {
        return <any>response.json()
      })
      .toPromise()
      .catch(this.handleError);
  }


  // createNewPackage(newPackage: object): Promise<any> {
  //   const testPackage = {
  //     'index': 'test_index',
  //     'type': 'test_type',
  //     'id': 'my_id',
  //     'body': {
  //       'testField': 'abc'
  //     }
  //   }
  //   const url = buildURL(`/registry/ros/v1/create/pkg?token=abc`);
  //   return this._http.post(url, testPackage, { withCredentials: true })
  //     .map((response: Response) =>
  //       // response.json()
  //       console.log(response))
  //     .toPromise().then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {console.log(error)});
  //
  // }
}

