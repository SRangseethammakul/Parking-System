const mongoose = require('mongoose');
const mongo = require('mongodb');
const dbURL = 'mongodb://mongo:27017/docker-node-mongo';

mongoose.connect(dbURL, {
    useNewUrlParser : true
});

const db = mongoose.connection;
const Schema = mongoose.Schema;
const ticketSchema = new Schema({
    id : {
        type : Schema.ObjectId
    },
    numberPlate : {
        type : String,
        require : true
    },
    carSize : {
        type : String,
        require : true
    },
    parkLotId : {
        type : Number,
        require : true
    },
    parkLotName : {
        type : String,
        require : true
    },
    living:  Boolean,
    created: { 
        type: Date, 
        default: Date.now 
    },
    updated: { 
        type: Date, 
        default: Date.now 
    },
});

const tickets = module.exports = mongoose.model("tickets", ticketSchema);

module.exports.createTicker = (newTicket, callBack) => {
    newTicket.save(callBack);
}
module.exports.getTicketByNumberPlate = (numberPlate, callBack) => {
    tickets.findOne({
        numberPlate : numberPlate,
        living : true
    }, callBack);
}
module.exports.updateTicket = (data, callBack) => {
    const now = new Date();
    let query = {
        _id : data
    };
    tickets.findOneAndUpdate(query, {
        $set:{
            living : false,
            updated : now
        }
    },{new:true}, callBack);
}
module.exports.getTicketBySize = (size, callBack) => {
    tickets.find({
        carSize : size
    }, callBack);
}