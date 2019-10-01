export class FetchError {

  private _code: number;
  private _message: string;

  constructor(code, message?) {
    this._message = message;
    this._code = code;
  }

  get message() {
    return this._message;
  }

  get code() {
    return this._code;
  }
}