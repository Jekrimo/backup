import { Component, OnInit } from "@angular/core";
import {ICaseCollectionHistory, ICaseConfig, IWebsocketMessage, WS_COLLECTION_DONE} from "../shared/data.dto";
import { Observable } from "rxjs/Observable";
import { select } from "@angular-redux/store";
import { ActivatedRoute, Router } from "@angular/router";
import { CaseHistoryActions } from "./case-history.actions";
import {buildURL, buildWebsocketURL} from "../shared/util.web-api";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import * as moment from "moment";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
@Component({
  selector: "app-case-history",
  templateUrl: "./case-history.component.html",
  styleUrls: ["./case-history.component.css", "../app.component.css"]
})
export class CaseHistoryComponent implements OnInit {
  @select(["casesInfo", "caseHistory"]) caseHistory$: Observable<ICaseCollectionHistory[]>;
  public caseHistory: ICaseCollectionHistory[];
  private caseID: number;

  constructor(private route: ActivatedRoute,
              private _router: Router,
              private _actions: CaseHistoryActions) {
    this.caseHistory$.subscribe(value => this.caseHistory = value);
    this.route.params.subscribe(params => this.caseID = params["caseID"]);
  }

  ngOnInit() {
    const refreshCases = () => {
      if (this.caseID) {
        this._actions.getCaseHistory(this.caseID);
      }
    };

    const socket$ = new WebSocketSubject(buildWebsocketURL("api/ws"))
      .retryWhen(err => window.navigator.onLine ? Observable.timer(2000) : Observable.fromEvent(window, "online"));

    socket$.subscribe((next: IWebsocketMessage) => {
      if (next.type === WS_COLLECTION_DONE) {
        // refresh list on collection done #151559411
        refreshCases();
      }
    });

    refreshCases();
  }

  niceTime(unixTime: number): string {
    return moment.unix(unixTime).fromNow();
  }

  // noinspection JSMethodCanBeStatic
  niceSize(bytes: number): string {
    const megs = Math.round(bytes / 1024 / 1024.0);
    return megs > 1000 ? `${megs / 1024} GB}` : `${megs} MB`;
  }

  // noinspection JSMethodCanBeStatic
  downloadLink(h: ICaseCollectionHistory): string {
    // dont include anticache chunk in url, upsets binding too
    return buildURL(`api/case/collector/download/${h.runID}`, false);
  }

  // noinspection JSMethodCanBeStatic
  delete(h: ICaseCollectionHistory): void {
    // TODO: modal warning and use an action
    //return buildURL(`api/case/${h.collectorConfig.caseID}/history/delete/${h.id}`);
    this._actions.deleteCaseHistory(this.caseID, h);
  }

  backToCaseConfig(): void {
    this._router.navigate(["/case-configuration/", this.caseID ]);
    //return "";
  }
}
