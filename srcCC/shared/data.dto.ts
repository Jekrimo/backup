/**
 * Cases state interface
 * @export
 * @interface ICasesState
 */
export interface ICasesState {
  cases: ICaseDTO[];
  currentCase: ICaseConfig;
  users: IUserDTO;
  queuedCollectors: ICollectorConfiguration[];
  collectorTypes: ICollectorTypes[];
  tempCollector: ICasesRunState;
}

export interface ICasesRunState {
    tempCollector: Object;
 }

export interface ICaseDTO {
    caseNumber: string;
    evidenceNumber: string;
    examinerName: string;
    description: string;
    id: number;
    ownerID: number;
}

export interface ICollectorTypes {
  name: string;
  author: string;
  version: string;
  metadata: string;
  //authURL: string;
  appID: string;
  authScopes: string;
}

export interface ICollectorAuthRequest {
  url: string;
  requestID: string;
}

export interface ICollectionSummaryItem {
  name: string;
  value: string;
}

export interface ICollectionSummary {
  id: number;
  caseId: number;
  collectorId: number;
  collectorSummary: { [itemName: string]: string; };
  retrievedAt: Date;
}

export interface ICollectorConfiguration {
  id: number;
  caseID: number;
  collectorTypeName: string;
  collectorAlias: string;
  hasAuthorization: boolean;
  authInfo: IAuthorization;
  desiredChunkSize: number;
  indexNumber: number;
  authRequestID: string;
  summary: ICollectionSummary;
}

export interface IAuthorization {
  username: string;
  password: string;
  authCode: string;
  authRequestID: string;
}

export interface ICaseConfig {
  case: ICaseDTO;
  configurations: ICollectorConfiguration[];
}

export interface ICaseCollectionHistory {
  id: number;
  runID: string;
  collectorConfig: ICollectorConfiguration;
  ownerID: number;
  startedAt: number; // epochs
  finishedAt: number;
  status: number;
  errorMessage: string;
  sizeBytes: number;
  filename: string;
}

export const WS_PROGRESS = "progress";
export const WS_LINK = "link";
export const WS_LOG = "log";
export const WS_COLLECTION_DONE = "collection_done";

// websocket/msg.go
export interface IWebsocketMessage {
  type:  "progress" | "link" | "log" | "collection_done";
  version: number;
  caseID: number;
  collectorConfigID: number;
}

// websocket/msg.go
export interface ILinkReadyMessage extends IWebsocketMessage {
  time: Date;
  linkType: "metadata" | "collection";
  runID: string;
}

// slog.go - LogLevel type
export enum SLogLevel {
  Trace,
  Info,
  Warn,
  Error
}

export interface ILogItem {
  log: string;
  level: number;
  time: Date;
}

export interface ILogsMessage extends IWebsocketMessage {
  logs: ILogItem[];
}

export interface IProgressState {
  stepName: string;
  current: number;
  pretty: string;
  showEstimatedTime: boolean; // collectors can determine whether to show time estimate
  //estimatedRemaining: number; // seconds remaining sent by server
  niceRemaining?: string;
  remainingDuration: string; // remaining string formatted by server
  secondsRemaining: number;
  max: number;
  percent: number;
}

export interface IProgressUpdate extends IWebsocketMessage {
  progressStates: IProgressState[];
}

export interface IUserDTO {
  id: number;
  isAdmin: boolean;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  authCode: string;
  tempPass: string;
  pwUserInput: string;
  configuration: string;
}

export interface IrunCollectorOption {
  parallel: boolean;
  series: boolean;
}

export const defaultCollector = {
  id: 0,
  caseID: 0,
  indexNumber: 0,
  collectorAlias: "",
  collectorTypeName: "",
  hasAuthorization: true,
  authCode: "",
  desiredChunkSize: 0,
  summary: {id: 0,
  caseId: 0,
  collectorId: 0,
  collectorSummary: null,
  retrievedAt: null}
};
export interface ISignUpForm {
  fullName: "";
  organization: "";
  badgeIdNumber: "";
  phoneNumber: "";
  address: "";
}
