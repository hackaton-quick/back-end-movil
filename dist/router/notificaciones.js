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
let serviceAccount = require("../fcm/credentials.json");
const notification = express_1.Router();
notification.post('/notification', (req, res) => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://notification-test-da4dc.firebaseio.com"
    });
    let registrationToken = 'eOBm93E-TXSv_GM2HU9h6f:APA91bGzakghTjEkJHgxOldTHySfa6qM-toAzATD9KpdZvh8UUsxaW5-TCf9eN7I18bB1U8Niqzwz2GDPVSBAzZfnCoaTBHCy0bjwAhj-Hlof8QeiMknLWPuwIWwNWTd20W4Zald-7KG';
    let message = {
        notification: {
            title: 'Safe areas',
            body: 'Alerta of safe areas'
        },
        token: registrationToken
    };
    admin.messaging().send(message)
        .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
        .catch((error) => {
        console.log('Error sending message:', error);
    });
});
exports.default = notification;
