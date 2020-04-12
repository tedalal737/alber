import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Express
import * as express from 'express';
import * as cors from 'cors';
// const utf8 = require('utf8');
const axios = require('axios');


// Multi Route ExpressJS HTTP Function
const app = express();
app.use(cors({ origin: true }));


const serviceAccount = require("../alber-47b04-firebase-adminsdk-8b5ae-709d90d24e.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://alber-47b04.firebaseio.com"
});


app.post('/adoption-message', async (request, response) => {

    try {

        const doc = await admin.firestore().doc('messages/adoption-message').get();
        const docData = doc.data();

        if (docData) {
            // const escapedMessage = escape(docData.message);
            const message = 'المملكة';
            console.log(message)
            const url = `http://www.qyadat.com/sms/api/sendsms.php?username=tedalal737&password=225588&message=${message}&numbers=0552931748&sender=School&unicode=u&return=full`;
            const sendSms = await axios.get(url);
            console.log(sendSms.body);

            response.send('messge sent');
        }

        else {
            response.status(500).send("error");
        }

    } catch (error) {
        console.log(error);
        response.status(500).send(error);
    }

});

export const api = functions.https.onRequest(app);
