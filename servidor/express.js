const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

/* Para Heroku */

app.use(express.static('cliente/build'));

// if(process.env.NODE_ENV === 'production') {
//     const path = require('path');
//     app.get('/*', (request, response) => {
//         response.sendFile(path.resolve(__dirname, '../cliente', 'build', 'index.html'));
//     });
// }

/* Para Heroku */

module.exports = app;

