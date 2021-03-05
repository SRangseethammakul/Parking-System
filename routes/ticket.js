const express = require('express');
const router = express.Router();
const parks = require('../park');
const Tickets = require('../models/tickets');
router.get('/', (req, res) => {
    return res.status(200).json({
        status: 'success',
        data: parks,
    });
});
router.post('/create', (req, res) => {
    const park_fillter = parks.filter((park) => {
        return park.status === 'ready';
    });
    if(park_fillter.length === 0){
        return res.status(200).json({
            status: 'Parking lot is not available.'
        });
    }
    const {numberPlate, carSize} = req.body;
    console.log(numberPlate, carSize);
    park_fillter[0].status = 'usable';
    let data = new Tickets({
        numberPlate : numberPlate,
        carSize : carSize,
        parkLotId : park_fillter[0].id,
        parkLotName : park_fillter[0].name,
        living : true,
    });
    Tickets.createTicker(data, function(err){
        if(err) throw err;
        return res.status(200).json({
            status: 'success',
            data: {
                numberPlate : numberPlate,
                carSize : carSize,
                Lot : park_fillter[0].name
            }
        });
    });
});
router.put('/leave/:numberPlate', (req, res) => {
    const { numberPlate } = req.params;
    console.log(numberPlate);
    Tickets.getTicketByNumberPlate(numberPlate, function(err, data){
        if(err) throw err;
        var { _id, parkLotId } = data;
    });
    console.log(_id, parkLotId);
    return res.status(200).json({
        status: 'success',
        data: {
            numberPlate : numberPlate
        }
    });
});
router.get('/:status', (req, res) => {
    if (req.params.status !== 'ready' && req.params.status !== 'usable') {
        return res.status(400).json({
          status: 'error',
          error: 'not decalare',
        });
    }
    const park_fillter = parks.filter((park) => {
        return park.status === req.params.status;
    });
    return res.status(200).json({
        status: 'success',
        data: park_fillter,
        total : park_fillter.length
    });
});
module.exports = router;