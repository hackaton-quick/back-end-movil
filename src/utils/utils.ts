import { XMLHttpRequest } from 'xmlhttprequest';
require('dotenv').config();

export const headers = {
    'QB-Realm-Hostname': 'hackathon20-jrubio.quickbase.com',
    'User-Agent': 'Back_end_services_V1',
    'Authorization': 'QB-USER-TOKEN b4g4xk_pdxv_bvdkgjxh23gmackkwd4xcmr3d9s',
    'Content-Type': 'application/json'
  }

export function createXHR() {
    return new XMLHttpRequest();
}

export const urlGET = 'https://api.quickbase.com/v1/records/query';
export const urlPOST = 'https://api.quickbase.com/v1/records';

export function crearJSON(resp:any) {
  let data = [];
  for (const it1 of resp.response.fields) {
      for (let it2 of Object.keys(resp.response.data[0])) {
          if(String(it1.id) === it2) {
              data.push([String(it1.label).replace(/[ #]/g, "_"),resp.response.data[0][it2]["value"]]);
          }
      }
  }
  return data;
}

export function crearJSONS(fields:any, params:any) {
    let data = [];
    for (const it1 of fields) {
        for (let it2 of Object.keys(params)) {
            if(String(it1.id) === it2) {
                data.push([String(it1.label).replace(/[ #]/g, "_"),params[it2]["value"]]);
            }
        }
    }
    return Object.fromEntries(data);
}