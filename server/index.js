const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const request = require('request-promise-native');
const env = Object.assign(require('./env.json'), process.env);
const crypto = require('crypto');

const EpicenterHelper = require('./epicenter-helper');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

function generateSignature(meetingNumber, role) {

    // Prevent time sync issue between client signature generation and zoom
    const THIRTY_SEC = 30000;
    const timestamp = new Date().getTime() - THIRTY_SEC;
    const msg = Buffer.from(env.ZOOM_KEY + meetingNumber + timestamp + role).toString('base64');
    const hash = crypto.createHmac('sha256', env.ZOOM_SECRET).update(msg).digest('base64');
    const signature = Buffer.from(`${env.ZOOM_KEY}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64');

    return signature;
}

app.get('/zoom-signature', (req, res, next) => {
    const { meetingNumber, role } = req.query;
    const sig = generateSignature(meetingNumber, role);
    res.send({ signature: sig, apiKey: env.ZOOM_KEY });
});

app.use(express.static(path.join(__dirname, env.STATIC)));

app.listen(env.PORT, () => {
    console.log('Express started on port', env.PORT);
});
