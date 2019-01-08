
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
