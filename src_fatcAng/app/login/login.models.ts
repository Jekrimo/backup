///////////////////////////////////////////////////////////////////////////////
// Forensic Acquisition Tool For Cloud Based Data (FAT-C)
// Contract Number: N41756-17-C-4709
// TSWG Task: IS-DF-4379
// For support, enhancements, or questions please contact:
// Applied Research Associates (303-795-8106 / swat@ara.com)
///////////////////////////////////////////////////////////////////////////////
export enum ESessionState {
  Unknown,
  Challenge,
  Authed,
  Expired
}

export interface ILoginState {
  state: ESessionState;
  userName: string;
  userFirstLastName: string
  userID: number;
  isAdmin: boolean;
  sessionID: string;
}

export interface ILoginChallenge {
  sessionID: string;
  challenge: string;
}

export const INITIAL_STATE: ILoginState = {
  state: ESessionState.Unknown,
  isAdmin: false,
  userName: "",
  userFirstLastName: "",
  userID: 0,
  sessionID: "",
};
