import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { buildURL } from "../../shared/util.web-api";
// import { ICaseDTO } from "../shared/data.dto";
import { Router } from "@angular/router";


/**
 * @author Jeff Morris (jmorris@ara.com)
 * @description CasesManagerService handles Endpoint calls
 */
@Injectable()
export class HomeService {

  constructor(private _router: Router,
    private _http: Http) {
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  /**
   * Get all cases in the database
   */
  // getCurrentCases(): Promise<any> {
  //   const url = buildURL(`api/cases`);
  //   return this._http.get(url, { withCredentials: true })
  //     .map((response: Response) => <any>response.json())
  //     .toPromise()
  //     .catch(this.handleError);
  // }

  /**
   *  Get the case from the database
   * @param caseID - integer value of caseID
   */
  // getCase(caseID: number): Promise<ICaseDTO> {
  //   const url = buildURL(`api/case/${caseID}`);
  //   return this._http.get(url, { withCredentials: true })
  //     .map((resolve: Response) => <any>resolve.json())
  //     .toPromise()
  //     .catch(this.handleError);
  // }

  /**
   * Create a new empty case
   * @param newCaseName - name of the case (alias)
   */
  // createNewCase(newCaseName: ICaseDTO): Promise<any> {
  //   const url = buildURL(`api/case/new`);
  //   return this._http.post(url, newCaseName, { withCredentials: true })
  //     .map((response: Response) => <ICaseDTO>response.json())
  //     .toPromise()
  //     .then((createdCasewId: ICaseDTO) =>
  //       this._router.navigate(["/case-configuration/", createdCasewId.id]))
  //     .catch(this.handleError);
  // }
}
