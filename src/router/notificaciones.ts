import { Router, Request, Response } from "express";
import * as admin from 'firebase-admin';

let serviceAccount = require("../fcm/credentials.json");

const notification = Router();

notification.post('/notification', (req:Request, res:Response) => {

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

export default notification;