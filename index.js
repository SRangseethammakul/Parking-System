const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json('Parking');
});
const logger = require('./middleware/logger');
app.use(logger);
app.listen('3000', () => {
    console.log('Port 3000');
});