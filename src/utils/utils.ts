import { XMLHttpRequest } from 'xmlhttprequest';

export const headers = {
    'QB-Realm-Hostname': 'hackathon20-jrubio.quickbase.com',
    'User-Agent': 'Back_end_services_V1',
    'Authorization': 'QB-USER-TOKEN b4g4xk_pdxv_bvdkgjxh23gmackkwd4xcmr3d9s',
    'Content-Type': 'application/json'
  }

export function createXHR() {
    return new XMLHttpRequest();
}

export const url = 'https://api.quickbase.com/v1/records/query';