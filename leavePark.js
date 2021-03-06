const Tickets = require('./models/tickets');
const parks = require('./park');


function getTicket(numberPlate,status){
    return new Promise((resolve, reject) => {
        Tickets.getTicketByNumberPlate(numberPlate, status, function(err, data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    });
}
function updateTicket(id){
    return new Promise((resolve, reject) => {
        Tickets.updateTicket(id, function(err){
            if(err){
                reject(err);
            }
            else{
                resolve(1);
            }
        });
    });
}
function updatePark(id){
    console.log(id);
    const park = parks.find(element => element.id === id);
    if(!park){
        return 0;
    } 
    console.log(park);
    park.status = `ready`;
    park.useBy = null;
    park.count++;
    console.log(park);
}

module.exports = {
    getTicket,
    updateTicket,
    updatePark
}