import { Injectable } from "@angular/core";
import { buildURL } from "../shared/util.web-api";
import { Http, Response } from "@angular/http";
import { ICaseCollectionHistory } from "../shared/data.dto";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@Injectable()
export class CaseHistoryService {
  constructor(private _http: Http) {

  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  public getCaseHistory(caseID: number): Promise<any> {
    const url = buildURL(`api/case/${caseID}/history`);
    return this._http.get(url, { withCredentials: true })
      .map((resolve: Response) => <any>resolve.json())
      .toPromise()
      .catch(this.handleError);
  }

  public deleteCaseHistory(caseID: number, history: ICaseCollectionHistory): Promise<any> {
    const url = buildURL(`api/case/${caseID}/history/delete/${history.id}`);
    return this._http.get(url, { withCredentials: true })
      .map((resolve: Response) => <any>resolve.json())
      .toPromise()
      .catch(this.handleError);
  }
}
