const express = require('express');
const {
    WebhookClient
} = require('dialogflow-fulfillment');
const router = express.Router();
const lineMessage = require('../controller/linemessage');

router.post('/', (req, res) => {
    console.log('POST: /');
    console.log('Body: ', req.body);
    const agent = new WebhookClient({
        request: req,
        response: res
    });

    function welcome(agent) {
        console.log("---------------------line welcome---------------------------");
        let payloadJson = {
            "type": "sticker",
            "packageId": "11537",
            "stickerId": "52002762"
        };
        let payload = new Payload("LINE", payloadJson, {
            sendAsMessage: true
        });
        agent.add(`Welcome to my agent!`);
        agent.add(payload);	
    }
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    agent.handleRequest(intentMap);
});
module.exports = router;