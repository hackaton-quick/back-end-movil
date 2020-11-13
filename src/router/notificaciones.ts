import { Router, Request, Response } from "express";
import * as admin from 'firebase-admin';

var serviceAccount = require("../fcm/credentials.json");



const notification = Router();

notification.post('/notification', (req:Request, res:Response) => {

    var registrationToken = 'TOKEN_REGISTRATION';

    var message = {
        data: {
        score: '850',
        time: '2:45'
        },
        token: registrationToken
    };


    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://notification-test-da4dc.firebaseio.com"
    });

    admin.messaging().send(message)
    .then((response) => {
    // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
  });
    

});

export default notification;