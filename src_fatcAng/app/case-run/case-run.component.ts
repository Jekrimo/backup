import { CasesRunCollectorsActions } from "./case-run.actions";
import { RunCasesService } from "./case-run.service";
import { CaseConfigurationService } from "../case-configuration/case-configuration.service";
import {
  ICaseConfig,
  ICollectorConfiguration,
  ILinkReadyMessage,
  ILogItem,
  ILogsMessage,
  IProgressState,
  IProgressUpdate,
  IUserDTO,
  IWebsocketMessage,
  SLogLevel, WS_COLLECTION_DONE,
  WS_LINK,
  WS_LOG,
  WS_PROGRESS
} from "../shared/data.dto";
import { CaseConfigurationActions } from "../case-configuration/case-configuration.actions";
import { Component, OnInit } from "@angular/core";
import { select, NgRedux } from "@angular-redux/store";
import { LoginActions } from "../login/login.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { IAppState } from "../store";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { map, isNil, take, reverse, last } from "ramda";
import { CurrentCaseActions } from "../shared/current-case/current-case.actions";
import { buildURL, buildWebsocketURL } from "../shared/util.web-api";
import { WebSocketSubject } from "rxjs/observable/dom/WebSocketSubject";
import "rxjs/add/operator/retryWhen";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/timer";
///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////

// max number of logs to show in live-log at once
// changing this to a bigger number can greatly affect performance
const LOG_TAIL = 10;

@Component({
  selector: "app-case-run",
  templateUrl: "./case-run.component.html",
  styleUrls: ["../case-configuration/case-configuration.component.scss", "./case-run.component.scss", "../app.component.css"],
  providers: [RunCasesService, CaseConfigurationService, CaseConfigurationActions, CasesRunCollectorsActions]
})

export class CaseRunComponent implements OnInit {
  @select(["casesInfo", "currentCase"]) currentCase$: Observable<ICaseConfig>;
  @select(["casesInfo", "currentCase", "configurations"]) caseCollectors$: Observable<ICollectorConfiguration[]>;
  @select(["casesInfo", "queuedCollectors"]) series$: Observable<any>;
  @select(["usersInfo", "currentUser"]) displayCurrentUsertype$: Observable<IUserDTO>;

  /**
   * Case ID taken from the route parameter
   *
   * @type {number}
   * @memberOf CaseRunComponent
   */
  public caseID: number;
  public displayCurrentUsertype: IUserDTO;

  public collectors: ICollectorConfiguration[];

  // DH 20170821: TODO !!! move the websocket handling into proper state later on after demo

  public progressMessages: {
    [collectorConfigID: number]: IProgressState
  };

  public logMessages: {
    [cfgID: number]: ILogItem[]
  };

  public collectionCompletes: {
    [cfgID: number]: boolean;
  };

  public linkMessages: {
    metadata: {
      [collectorConfigID: number]: boolean
    },
    collection: {
      [collectorConfigID: number]: ILinkReadyMessage
    }
  };

  public dlComplete: string;
  public disableRunButton = false;
  public currentCase: ICaseConfig;
  private currentConfig: any;
  public series;

  constructor(private _loginActions: LoginActions,
              private _router: Router,
              private route: ActivatedRoute,
              private _caseRunCollectorActions: CasesRunCollectorsActions,
              private _caseRunService: RunCasesService,
              private _currentCaseActions: CurrentCaseActions,
              public state: NgRedux<IAppState>) {

    this.route.params.subscribe(params => {
      this.caseID = params["caseID"];
    });

    this.series$.subscribe(value => this.series = value);
    this.currentCase$.subscribe(value => {
      this.currentCase = value;
    });

    this.displayCurrentUsertype$.subscribe(value => {
      this.displayCurrentUsertype = value;
    });

    this.caseCollectors$.subscribe(value => {
      this.collectors = value;
    });

    const socket$ = new WebSocketSubject(buildWebsocketURL("api/ws"))
      .retryWhen(err => window.navigator.onLine ? Observable.timer(2000) : Observable.fromEvent(window, "online"));

    socket$.subscribe((next: IWebsocketMessage) => {
      this.handleWebsocketMessage(next);
    });

    this.progressMessages = {};
    this.logMessages = {};
    this.linkMessages = {
      metadata: {},
      collection: {}
    };
    this.collectionCompletes = {};
  }

  // leave a property so this remains lexically scoped
  handleWebsocketMessage = (msg: IWebsocketMessage): void => {
    // note - if we get an inflight W/S before we have reloaded state
    // when eg, user refreshes page and we need to relaod case,
    // ignore the w/s
    if (!this.currentCase || !this.currentCase.configurations) {
      return;
    }

    // TODO: move these to redux state via actions. too much local state going on here

    switch (msg.type) {
      case WS_PROGRESS:
        const pm = <IProgressUpdate>msg;
        // format second here, doing it in markup binding
        // caused angular devmode errors for value changed after checked.
        // couldnt figure it out
        // backend will send all new progress states in an array, use latest
        const lastState = last(pm.progressStates);
        if (isNil(lastState)) {
          break;
        }
        //lastState.niceRemaining = lastState.remainingDuration; // this.formatSeconds(lastState.secondsRemaining);
        lastState.niceRemaining = this.formatSeconds(lastState.secondsRemaining);
        this.progressMessages[pm.collectorConfigID] = lastState;
        break;
      case WS_LOG:
        const logMsg = <ILogsMessage>msg;
        const newLogsChrono = reverse(logMsg.logs);

        if (isNil(this.logMessages[logMsg.collectorConfigID])) {
          this.logMessages[logMsg.collectorConfigID] = take(LOG_TAIL, newLogsChrono);
        } else {
          this.logMessages[logMsg.collectorConfigID] = take(LOG_TAIL, [...newLogsChrono, ...this.logMessages[logMsg.collectorConfigID]])
        }
        break;
      case WS_LINK:
        const lm = <ILinkReadyMessage>msg;
        if (lm.linkType === "metadata") {
          this.linkMessages.metadata[lm.collectorConfigID] = true;
        } else {
          this.linkMessages.collection[lm.collectorConfigID] = lm;
        }
        break;
      case WS_COLLECTION_DONE:
        this.dlComplete = "progress-bar-success";
        this.collectionCompletes[msg.collectorConfigID] = true;
        break;
    }
    // fun note about next line bracket: webstorm highlights as missing ';'
    // (which is right), but that causes a lint error! woopie
  }

  formatSeconds(secs: number): string {
    // just do this a ghetto way, moment humanize is absolutely insane in accuracy
    if (secs < 60) {
      return `${Math.round(secs)} seconds`;
    }
    let v = secs;
    v /= 60;
    const mins = v % 60;

    v /= 60;
    const hours = v % 60;

    if (hours < 1) {
      if (mins > 1) {
        return `${Math.round(mins)} minutes`;
      }
      return `${Math.round(v)} seconds`
    }

    return `${Math.round(hours * 100) / 100} hours`;
    // // const m = moment().seconds(secs);
    // const s = Math.ceil(secs);
    // // beware duration expects milliseconds by default
    // const d = moment.duration(s, "seconds");
    //
    // return d.humanize(true);
    // because moment is junk made by a dork who doesn't see value in having
    // remotely accurate humanize strings
    // (anything < 60 seconds is a few seconds, then when seconds < 15 or so, it says 'a few seconds ago')
    // create a proper moment and add it, so we can clamp it with max to hopefully make it slightly less stupid
    //const m = moment();
    // const est = m.add(d);
    // const clamped = moment.max(est);
    //
    // // now take clamped and subtract it from now again to get a 'good' duration, jk there is no easy way
    // // to get a duration between two moments this is awful
    // //const newEst = clamped.diff(m);
    // //const diff = clamped.subtract(m);
    // //return newEst.humanize(true);
    // return moment().to(clamped);
  }
  RunningCollectors() {
    return true;
  }

  onNextClick() {
    this._router.navigate(["/case-results/", this.caseID]);
  }

  onBackClick() {
    this._router.navigate(["/case-configuration/", this.caseID]);
  }

  // noinspection JSMethodCanBeStatic
  getCssClassForLogLevel(ll: number) {
    switch (ll) {
      case SLogLevel.Error:
        return "logtextline-error";
      case SLogLevel.Warn:
        return "logtextline-warn";
      default:
        return "logtextline-info";
    }
  }

  // todo maybe move these to service
  // hmm, build url anti-cache timestamp makes angular throw a fit, so put static values in here

  //noinspection JSMethodCanBeStatic
  getMetadataLink(collectorID: number) {
    return buildURL(`api/case/collector/metadata/${collectorID}`, false);
  }

  //noinspection JSMethodCanBeStatic
  getDownloadLink(collectorID: number) {
    const lm = this.linkMessages.collection[collectorID];
    if (lm) {
      return buildURL(`api/case/collector/download/${lm.runID}`, false);
    }
    return "";
  }

  ngOnInit() {
    if (!this.currentCase) {
      this._currentCaseActions.getCurrentCase(this.caseID)
        .then(() => {
          this._currentCaseActions.getCaseConfigurationByCaseId(this.caseID);
        })
    }
  }

  onRunSeriesClick(collectorId: any) {
    this.disableRunButton = true;
    this.currentConfig = this.currentCase.configurations[0];
    this.currentCase.configurations.forEach(x => {
      this.collectionCompletes[x.id] = false;
      this.logMessages[x.id] = [];
      this.progressMessages[x.id] = null;
      this._caseRunCollectorActions.runCollectorInSeries(x.id);
    });
  }

  getScrollHeight(elem: any) {
    const ta = <HTMLTextAreaElement>elem;
    ta.scrollTop = ta.scrollHeight;
  }

  getLogText(cfgID: number) {
    const lms = this.logMessages[cfgID];
    return map(li => `${li.time}: ${li.log}`, lms);
  }

  // Check if any errors are reported in the log
  // messages and return the findings
  isErrorLogged(logMessages: any): boolean {
    let found = false;
    const keys = Object.keys(logMessages);
    keys.forEach(key => {
      logMessages[key].map(item => {
        if (item.level === 2) {
          found = true;
        }
      });
    });
    return found;
  }
}
