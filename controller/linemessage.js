const {WebhookClient} = require('dialogflow-fulfillment');
exports.linewebhook = async (req, res, next) => {
    try {
        // data: {
        //  source: {
        //    type: 'group',
        //    userId: 'U81efab622d49ada767ff1832d3ae34b6',
        //    groupId: 'C167e066639599054fbef9c2a02b4067c'
        //  },
        //  timestamp: '1615736934436',
        //  replyToken: 'd060293ae8da45f5b6d0b7480fb08134',
        //  message: { text: 'ลงทะเบียนกลุ่ม', id: '13716816183596', type: 'text' },
        //  type: 'message'
        //   }
        // }
        const agent = new WebhookClient({request: req, response: res});
        
        function welcome(agent) {
            console.log("---------------------line welcome---------------------------");
            agent.add(`Welcome to my agent!`);
            
        }


        let intentMap = new Map();
        intentMap.set('Default Welcome Intent', welcome);
        agent.handleRequest(intentMap);
    } catch (error) {
        next(error); 
    }
}