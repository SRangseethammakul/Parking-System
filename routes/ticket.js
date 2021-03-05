const express = require('express');
const router = express.Router();
const parks = require('../park');
const Tickets = require('../models/tickets');
const { updateTicket, getTicket, updatePark } = require('../leavePark');
const { createTicket, getTicketBySize } = require('../entryPark');

router.get('/', (req, res) => {
    return res.status(200).json({
        status: 'success',
        data: parks,
    });
});
router.post('/create',async (req, res) => {
    const park_fillter = parks.filter((park) => {
        return park.status === 'ready';
    });
    if(park_fillter.length === 0){
        return res.status(200).json({
            status: 'Parking lot is not available.'
        });
    }
    const {numberPlate, carSize} = req.body;
    const ticket = await getTicket(numberPlate);
    console.log(ticket);
    if(ticket){
        return res.status(400).json({
            status: 'numberPlate undefined',
        });
    }
    park_fillter[0].status = 'usable';
    let data = new Tickets({
        numberPlate : numberPlate,
        carSize : carSize,
        parkLotId : park_fillter[0].id,
        parkLotName : park_fillter[0].name,
        living : true,
    });
    const resDate = await createTicket(data);
    return res.status(200).json({
        status: 'success',
        data: {
            numberPlate : resDate.numberPlate,
            carSize : resDate.carSize,
            Lot : resDate.parkLotName
        }
    });
});
router.put('/leave/:numberPlate', async (req, res) => {
    const { numberPlate } = req.params;
    const ticket = await getTicket(numberPlate);
    console.log(!ticket);
    if(!ticket){
        return res.status(400).json({
            status: 'numberPlate undefined',
        });
    }
    await updateTicket(ticket._id);
    await updatePark(ticket.parkLotId);
    return res.status(200).json({
        status: 'success'
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

router.get('/getTicketBySize/:size', async (req, res) => {
    const { size } = req.params;
    console.log(size);
    const cars = await getTicketBySize(req.params.size);
    const carBySize = cars.map(car => ({
        numberPlate: car.numberPlate,
        parkLotName : car.parkLotName,
        Status : car.living ? "usable" : "Not in use",
        entry : car.created.toLocaleDateString(),
        leave : car.living ? "usable" : car.updated.toLocaleDateString('th-TH'),
        timeUse : car.living ? "usable" : `${(car.updated - car.created) / 1000} seconds`,
    }));
    console.log("olderPerson : ", carBySize);
    return res.status(200).json({
        status: 'success',
        data : carBySize,
        total : cars.length
    });
});

module.exports = router;