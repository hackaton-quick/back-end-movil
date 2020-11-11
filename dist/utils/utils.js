"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearJSONS = exports.crearJSON = exports.urlPOST = exports.urlGET = exports.createXHR = exports.headers = void 0;
const xmlhttprequest_1 = require("xmlhttprequest");
require('dotenv').config();
exports.headers = {
    'QB-Realm-Hostname': 'hackathon20-jrubio.quickbase.com',
    'User-Agent': 'Back_end_services_V1',
    'Authorization': 'QB-USER-TOKEN b4g4xk_pdxv_bvdkgjxh23gmackkwd4xcmr3d9s',
    'Content-Type': 'application/json'
};
function createXHR() {
    return new xmlhttprequest_1.XMLHttpRequest();
}
exports.createXHR = createXHR;
exports.urlGET = 'https://api.quickbase.com/v1/records/query';
exports.urlPOST = 'https://api.quickbase.com/v1/records';
function crearJSON(resp) {
    let data = [];
    for (const it1 of resp.response.fields) {
        for (let it2 of Object.keys(resp.response.data[0])) {
            if (String(it1.id) === it2) {
                data.push([String(it1.label).replace(/[ #]/g, "_"), resp.response.data[0][it2]["value"]]);
            }
        }
    }
    return data;
}
exports.crearJSON = crearJSON;
function crearJSONS(fields, params) {
    let data = [];
    for (const it1 of fields) {
        for (let it2 of Object.keys(params)) {
            if (String(it1.id) === it2) {
                data.push([String(it1.label).replace(/[ #]/g, "_"), params[it2]["value"]]);
            }
        }
    }
    return Object.fromEntries(data);
}
exports.crearJSONS = crearJSONS;
