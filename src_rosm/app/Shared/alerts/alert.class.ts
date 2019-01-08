export enum AlertType {
  info = 0,
  success = 1,
  warning = 2,
  error = 3,
  success_quiet = 4
}

export class Alert {
  private _id: string;
  private _type: AlertType;
  private _message: string;

  get id(): string {
    return this._id;
  }

  get type(): AlertType {
    return this._type;
  }

  get message(): string {
    return this._message;
  }

  constructor(id: string, type: AlertType, message: string) {
    this._id = id;
    this._type = type;
    this._message = message;
  }
}
