const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json('response');
});

app.listen('3000', () => {
    console.log('Port 3000');
});