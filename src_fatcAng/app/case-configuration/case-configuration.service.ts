import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { buildURL } from "../shared/util.web-api";
import {
  IAuthorization, ICaseConfig, ICaseDTO, ICollectionSummary, ICollectorAuthRequest, ICollectorConfiguration,
  ICollectorTypes
} from "../shared/data.dto";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
/**
 * @author Shaun Shepherd (sshepherd@ara.com)
 * @description CaseConfigurationService handles Endpoint calls
 */
@Injectable()
export class CaseConfigurationService {
  constructor(private _http: Http) {

  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  getCurrentCaseEstimates(caseID: number): Promise<ICollectionSummary[]> {
    const url = buildURL(`api/case/configuration/all/estimates/${caseID}`);
    return this._http.get(url, { withCredentials: true })
      .map((resolve: Response) => <any>resolve.json())
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * Create a new empty case
   * @param newConfig - name of the case (alias)
   */
  createNewConfiguration(newConfig: ICaseConfig): Promise<ICaseConfig> {
    const url = buildURL(`api/case/configuration/new`);
    return this._http.post(url, newConfig, { withCredentials: true })
      .map((response: Response) => <ICaseConfig>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  getCollectionEstimate(configID: number) {
    const url = buildURL(`api/case/collector/estimate/${configID}`);
    return this._http.get(url, { withCredentials: true })
      .map((resolve: Response) => <any>resolve.json())
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * Delete a collector
   * @param {configID} deleteCollector
   * @returns {Promise<any>}
   * @memberOf CaseConfigurationService
   */
  deleteCollector(configID: number) {
    const url = buildURL(`api/case/configuration/delete/${configID}`);
    return this._http.delete(url, { withCredentials: true })
      .map((resolve: Response) => <any>resolve.json())
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * Update the case config object
   * @param {ICaseConfig} caseConfig
   * @returns {Promise<ICaseConfig>}
   * @memberOf CaseConfigurationService
   */
  updateCaseConfiguration(caseConfig: ICaseConfig): Promise<ICaseConfig> {
    const url = buildURL(`api/case/update/WithConfig`);
    return this._http.put(url, caseConfig, { withCredentials: true })
      .map((response: Response) => <ICaseConfig>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  getAuthURL(collectorName: string): Promise<ICollectorAuthRequest> {
    const url = buildURL(`api/case/collector/${collectorName}/authurl`);
    return this._http.get(url, { withCredentials: true })
      .map((r: Response) => <ICollectorAuthRequest>r.json())
      .toPromise()
      .catch(this.handleError);
  }

  /**
   * sends the auth code retrieved from 3rd party website to the backend. this is
   * in case the auth code itself is not to be saved directly, the backend will return what the collector reports to save
   * @param config
   * @param authInfo will be sent in request body
   */
  saveAuthCode(config: ICollectorConfiguration) {
    const url = buildURL(`api/case/collector/saveAuthInfo`);
    return this._http.put(url, config, { withCredentials: true })
      .map((response: Response) => <ICaseDTO>response.json())
      .toPromise()
      .catch(this.handleError);
  }

  getAvailableCollectors(): Promise<ICollectorTypes> {
    const url = buildURL(`api/collectors`);
    return this._http.get(url, { withCredentials: true })
      .map((resolve: Response) => <any>resolve.json())
      .toPromise()
      .catch(this.handleError);
  }
}
