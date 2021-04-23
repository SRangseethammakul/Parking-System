const path =require('path');
const express = require('express');
 
const app = express();
 
app.get('/', (req, res) => {
    res.json({
        version : '1.0.1',
        description : 'api parking'
    });
});
 
const parkRouter = require('./routes/park');
const ticketRouter = require('./routes/ticket');
const lineMessageRouter = require('./routes/linemessage');
 
const logger = require('./middleware/logger');
 
app.use(express.json());
app.use(express.urlencoded({
    extended : false
}));
 
app.use(logger);
 
//Route

app.use('/apis/parks', parkRouter);
app.use('/apis/ticket', ticketRouter);
app.use('/apis/linemessage', lineMessageRouter);

app.listen('3000', () => {
    console.log('Port 3000');
});