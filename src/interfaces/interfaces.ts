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

//************************************************************************* */
export interface Respuesta {
  xhr: Xhr;
  request: Request;
  status: number;
  responseType: string;
  response: Responses;
}

export interface Responses {
  data: Datum[];
  fields: Field[];
  metadata: Metadata;
}

export interface Metadata {
  numFields: number;
  numRecords: number;
  skip: number;
  totalRecords: number;
}

export interface Field {
  id: number;
  label: string;
  type: string;
}

export interface Datum {
  '6': _6;
  '7': _6;
  '19': _6;
  '3': _6;
  '28': _6;
}

export interface _6 {
  value: string;
}

export interface Requests {
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

export interface Headerss {
  'QB-Realm-Hostname': string;
  'User-Agent': string;
  Authorization: string;
  'Content-Type': string;
}

export interface Xhrs {
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