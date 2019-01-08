import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { buildURL } from "../shared/util.web-api";
import { Router } from "@angular/router";
import { ICollectorConfiguration } from "../shared/data.dto";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
/**
 * @author Jeff Morris (jmorris@ara.com)
 * @description RunCasesService handles Endpoint calls
 */

@Injectable()
export class RunCasesService {

  constructor(private _router: Router,
              private _http: Http) {
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  runCollectorConfig(configID: number) {
    const url = buildURL(`api/case/collector/start/${configID}`);
    return this._http.get(url, { withCredentials: true })
      .map((resolve: Response) => <any>resolve.json())
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * Get the configurations for a case (by id)
   * @param {number} caseID
   * @returns
   * @memberOf CaseConfigurationService
   */
  getCaseConfigurationByCaseId(caseID: number): Promise<ICollectorConfiguration[]> {
    const url = buildURL(`api/case/configurationForCase/${caseID}`);
    return this._http.get(url, { withCredentials: true })
      .map((resolve: Response) => <any>resolve.json())
      .toPromise()
      .catch(this.handleError);
  }
}
