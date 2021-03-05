const path =require('path');
const express = require('express');
 
const app = express();
 
app.get('/', (req, res) => {
    res.json('Parking');
});
 
const parkRouter = require('./routes/park');
const ticketRouter = require('./routes/ticket');
 
const logger = require('./middleware/logger');
 
app.use(express.json());
app.use(express.urlencoded({
    extended : false
}));
 
app.use(logger);
 
//Route

app.use('/apis/parks', parkRouter);
app.use('/apis/ticket', ticketRouter);

app.listen('3000', () => {
    console.log('Port 3000');
});