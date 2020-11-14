"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin = __importStar(require("firebase-admin"));
const ajax_1 = require("rxjs/ajax");
const utils_1 = require("../utils/utils");
const operators_1 = require("rxjs/operators");
let serviceAccount = require("../fcm/credentials.json");
const notification = express_1.Router();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://notification-test-da4dc.firebaseio.com"
});
notification.post('/notification', (req, res) => {
    let data = [];
    let registrationToken = [];
    const args = {
        "from": "bqxxn48j6",
        "select": [36]
    };
    ajax_1.ajax({ createXHR: utils_1.createXHR, url: utils_1.urlGET, method: 'POST', headers: utils_1.headers, body: args }).pipe(operators_1.timeout(60000), operators_1.retry(5)).subscribe((resp) => {
        for (let it2 of resp.response.data) {
            data.push(utils_1.crearJSONS(resp.response.fields, it2));
        }
        for (const iterator of data) {
            registrationToken.push(iterator.Token_notification);
        }
        let message = {
            notification: {
                title: 'Safe areas',
                body: 'Alerta of safe areas'
            }
        };
        let options = {
            priority: 'high',
            timeToLive: 60 * 60 * 24
        };
        admin.messaging().sendToDevice(registrationToken, message, options)
            .then((response) => {
            res.json({ status: 200, message: 'Se envio el correo satisfactoriamente.' });
        })
            .catch((error) => {
            res.json({ status: 500, message: 'Algo malo ocurrio. \n' + error });
        });
    }, (errr) => {
        res.json({
            status: errr.status,
            response: errr.response
        });
    });
});
exports.default = notification;
