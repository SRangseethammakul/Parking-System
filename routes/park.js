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

router.post('/', (req, res) => {
    if (!req.body.value) {
        return res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
        });
    }
    if (isNaN(req.body.value)) {
        return res.status(400).json({
          status: 'error',
          error: 'req body value is int',
        });
    }
    if (req.body.value <= 0) {
        return res.status(400).json({
          status: 'error',
          error: 'req body value more 1',
        });
    }
    parks.splice(0, parks.length); // for clear park
    Tickets.updateStatuAll(function(err, data){
        if(err) throw err;
        console.log("data" , data);
    });
    for(let i = 1 ; i <= req.body.value ; i++){
        const newPark = {
            id : i,
            name : `A-${i}`,
            status : `ready`,
            count : 0,
            useBy : null
        }
        parks.push(newPark);
    }
    return res.status(200).json({
        status: 'success',
        data: parks,
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

router.get('/checkParkNumberPlate/:numberPlate', (req, res) => {

    const park_fillter = parks.filter((park) => {
        return park.useBy === req.params.numberPlate;
    });
    return res.status(200).json({
        status: 'success',
        data: park_fillter
    });
});

module.exports = router;