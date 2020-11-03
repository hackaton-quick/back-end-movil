import { XMLHttpRequest } from 'xmlhttprequest';
require('dotenv').config();

export const headers = {
    'QB-Realm-Hostname': process.env.QB,
    'User-Agent': process.env.User_Agent,
    'Authorization': process.env.Authorization,
    'Content-Type': 'application/json'
  }

export function createXHR() {
    return new XMLHttpRequest();
}

export const url = 'https://api.quickbase.com/v1/records/query';