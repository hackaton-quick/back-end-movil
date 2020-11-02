"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = exports.createXHR = exports.headers = void 0;
const xmlhttprequest_1 = require("xmlhttprequest");
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
exports.url = 'https://api.quickbase.com/v1/records/query';
