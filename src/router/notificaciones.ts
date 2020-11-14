import { Router, Request, Response } from "express";
import * as admin from 'firebase-admin';

let serviceAccount = require("../fcm/credentials.json");

const notification = Router();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://notification-test-da4dc.firebaseio.com"
});

notification.post('/notification', (req:Request, res:Response) => {

    let registrationToken = 'eOBm93E-TXSv_GM2HU9h6f:APA91bGzakghTjEkJHgxOldTHySfa6qM-toAzATD9KpdZvh8UUsxaW5-TCf9eN7I18bB1U8Niqzwz2GDPVSBAzZfnCoaTBHCy0bjwAhj-Hlof8QeiMknLWPuwIWwNWTd20W4Zald-7KG';

    let message = {
        notification: {
            title: 'Safe areas',
            body: 'Alerta of safe areas'
        },
        token: registrationToken
    };

    admin.messaging().send(message)
    .then((response:any) => {
    // Response is a message ID string.
        console.log('Successfully sent message:', response);
        res.json({ status: 200, message: 'Se envio el correo satisfactoriamente.'});
    })
    .catch((error:any) => {
        console.log('Error sending message:', error);
        res.json({ status: 500, message: 'Algo malo ocurrio.'});
  });
    

});

export default notification;