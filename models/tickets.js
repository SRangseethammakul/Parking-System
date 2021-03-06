const mongoose = require('mongoose');
const mongo = require('mongodb');
const dbURL = 'mongodb://mongo:27017/docker-node-Parking';
// const dbURL = 'mongodb://localhost:27017/TicketDB';
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
module.exports.getTicketByNumberPlate = (numberPlate, status, callBack) => {
    tickets.find({
        numberPlate : numberPlate,
        living : status
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
module.exports.updateStatuAll = (callBack) => {
    tickets.updateMany(
        { $set: { "living" : false } },
        callBack
    );
}