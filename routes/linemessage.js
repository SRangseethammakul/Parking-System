const express = require('express');
const {WebhookClient} = require('dialogflow-fulfillment');
const router = express.Router();
const lineMessage = require('../controller/linemessage');
const agent = new WebhookClient({request: req, response: res});
router.get('/', (req, res) => {
    console.log('POST: /');
    console.log('Body: ',req.body);

    function welcome(agent) {
        console.log("---------------------line welcome---------------------------");
        agent.add(`Welcome to my agent!`);
    }
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    agent.handleRequest(intentMap);
    
});
module.exports = router;