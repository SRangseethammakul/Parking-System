const Tickets = require('./models/tickets');
const parks = require('./park');

function createTicket(dataI){
    return new Promise((resolve, reject) => {
        Tickets.createTicker(dataI, function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    });
}

function getTicketBySize(size){
    return new Promise((resolve, reject) => {
        Tickets.getTicketBySize(size, function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    });
}

module.exports = {
    createTicket,
    getTicketBySize
}