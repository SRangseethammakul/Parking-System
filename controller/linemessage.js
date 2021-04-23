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
        console.log("---------------------line---------------------------")
        console.log(req.body) 
        console.log("---------------------payload---------------------------")
        console.log(req.body.originalDetectIntentRequest.payload) 
        console.log(req.body.originalDetectIntentRequest.payload.data.source.groupId)
        let getgroupid = req.body.originalDetectIntentRequest.payload.data.source.groupId; 

        console.log("🚀 ~ file: lineController.js ~ line 119 ~ exports.linewebhook= ~ getgroupid", getgroupid)


        const agent = new WebhookClient({request: req, response: res});
        // console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
        // console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
        function welcome(agent) {
            console.log("---------------------line welcome---------------------------")
        }

        async function register(agent) {
            console.log("---------------------line fallback---------------------------")
            let gettext = req.body.queryResult.queryText; 
            console.log("🚀 ~ file: lineController.js ~ line 135 ~ register ~ gettext", gettext)
            let getcode = gettext.split(":")[1].trim();
            console.log("🚀 ~ file: lineController.js ~ line 136 ~ register ~ getcode", getcode)
            // "code": 1,
            // "message": "success",
            // "data": [
            //     {
            //         "message": "ลงทะเบียนสำเร็จ"
            //     }
            // ]
            let getSaveCode = await lineGroupController.saveLineGroupId(getcode,getgroupid);
            
            agent.add(`${getSaveCode.data[0].message}`);

            const {queryResult} = req.body;

        }
        let intentMap = new Map();
        
        console.log("---------------------line intentMap---------------------------")
        intentMap.set('Default Welcome Intent', welcome);

        intentMap.set('register', register);
        console.log(intentMap)
        console.log("---------------------line intentMap set---------------------------")
        // intentMap.set('your intent name here', yourFunctionHandler);
        // intentMap.set('your intent name here', googleAssistantHandler);
        console.log("---------------------line start hand---------------------------")
        agent.handleRequest(intentMap);
        console.log("---------------------line end hand---------------------------")
        // console.log(req.body)

    } catch (error) {
        next(error); 
    }
}