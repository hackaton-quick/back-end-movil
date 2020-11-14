import { Router, Request, Response } from "express";
import * as admin from 'firebase-admin';
import { ajax } from 'rxjs/ajax';
import { createXHR, headers, urlGET, crearJSONS } from '../utils/utils';
import { timeout, retry } from 'rxjs/operators';
import { ErrorQuick } from '../interfaces/interfaces';

let serviceAccount = require("../fcm/credentials.json");

const notification = Router();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://notification-test-da4dc.firebaseio.com"
});

notification.post('/notification', (req:Request, res:Response) => {

    let registrationToken:any[] = [];
    const args = {
        "from": "bqxxn48j6",
        "select": [ 36 ]
    };
    let options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24
    };

    ajax({  createXHR,  url:urlGET, method: 'POST', headers, body: args}).pipe(
        timeout(60000),
        retry(5),
    ).subscribe( (resp) => {        

        for (let it2 of resp.response.data) {
            registrationToken.push(crearJSONS(resp.response.fields, it2).Token_notification);
        }

        let message = {
            notification: {
                title: 'Safe areas.',
                body : 'Alert of safe areas.'
            },
            tokens: registrationToken,
            options
        };
    
        admin.messaging().sendMulticast(message)
        .then((response:any) => {
            res.json({ status: 200, message: 'Se envio el correo satisfactoriamente.'});
        })
        .catch((error:any) => {
            res.json({ status: 500, message: 'Algo malo ocurrio. \n'+error});
        });

    }, (errr:ErrorQuick) => {
        res.json({
            status: errr.status,
            response: errr.response
        });
    });   
    
});

export default notification;