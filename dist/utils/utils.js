"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = exports.createXHR = exports.headers = void 0;
const xmlhttprequest_1 = require("xmlhttprequest");
require('dotenv').config();
exports.headers = {
    'QB-Realm-Hostname': process.env.QB,
    'User-Agent': process.env.User_Agent,
    'Authorization': process.env.Authorization,
    'Content-Type': 'application/json'
};
function createXHR() {
    return new xmlhttprequest_1.XMLHttpRequest();
}
exports.createXHR = createXHR;
exports.url = 'https://api.quickbase.com/v1/records/query';
