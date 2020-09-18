const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const request = require('request-promise-native');
const env = Object.assign(require('./env.json'), process.env);

const EpicenterHelper = require('./epicenter-helper');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    return next();
});

app.use(express.static(path.join(__dirname, env.STATIC)));

app.listen(env.PORT, () => {
    console.log('Express started on port', env.PORT);
});
