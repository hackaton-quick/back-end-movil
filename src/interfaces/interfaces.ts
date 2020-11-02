export interface ErrorQuick {
  message: string;
  name: string;
  xhr: Xhr;
  request: Request;
  status: number;
  responseType: string;
  response: Response;
}

export interface Response {
  message: string;
  description: string;
}

export interface Request {
  async: boolean;
  crossDomain: boolean;
  withCredentials: boolean;
  headers: Headers;
  method: string;
  responseType: string;
  timeout: number;
  url: string;
  body: string;
}

export interface Headers {
  'QB-Realm-Hostname': string;
  'User-Agent': string;
  Authorization: string;
  'Content-Type': string;
}

export interface Xhr {
  UNSENT: number;
  OPENED: number;
  HEADERS_RECEIVED: number;
  LOADING: number;
  DONE: number;
  readyState: number;
  responseText: string;
  responseXML: string;
  status: number;
  statusText?: any;
  withCredentials: boolean;
  timeout: number;
  responseType: string;
}