
import { Injectable } from '@angular/core';
import { buildURL } from '../shared/util.web-api';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PackageServices {
  public tempPackages: any = {'key' : [
      {
        'type': 'a',
        'discription': 'Nam suas fugit persequeris te. At mel rebum hendrerit'
      },
{
  'type': 'b',
  'discription': 'NExerci aliquando at mei.'
},
{
  'type': 'c',
  'discription': 'At mel rebum hendrerit, cu sea doming gloriatur '
},
{
  'type': 'd',
  'discription': 'Cum amet etiam quidam ne. '
},
{
  'type': 'e',
  'discription': 'Vim putent scripserit in, civibus '
},
]}

  constructor(private _http: HttpClient, ) {
  }

  private handleError(error: any): Promise<any> {
    return this.tempPackages;
    // return Promise.reject(error.message || error);
  }

  // Service handler to retrieve all packages from server.

  getAllPackages(packID: string): Promise<any> {
    const url = buildURL(`pkg/`);
    const tempurl = 'http://localhost:4200';
    console.log(packID);
    // return this.tempPackages
     return this._http.get(tempurl, { withCredentials: true })
        .map((response: any) => {
          response = this.tempPackages;
          return <any>response.json()
        })
        .toPromise()
        .catch(this.handleError);
    }

  // Service handler to retrieve all packages from server.

  getPackageByID(packageID: string): Promise<any> {

    // this id is temp to match backend right now, CHANGE.
    packageID = 'my_id';

    const url = buildURL(`pkg/id/${packageID}`);
    console.log(packageID);
    return this._http.get(url, { withCredentials: true })
      .map((response: any) => {
        return <any>response.json()
      })
      .toPromise()
      .catch(this.handleError);
  }


  createNewPackage(newPackage: object): Promise<any> {
    const testPackage = {
      'index': 'test_index',
      'type': 'test_type',
      'id': 'my_id',
      'body': {
        'testField': 'abc'
      }
    }
    const url = buildURL(`/registry/ros/v1/create/pkg?token=abc`);
    return this._http.post(url, testPackage, { withCredentials: true })
      .map((response: Response) =>
        // response.json()
        console.log(response))
      .toPromise().then((response) => {
        console.log(response);
      })
      .catch((error) => {console.log(error)});

  }
  }

